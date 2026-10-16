/* Smugsafaris admin dashboard (vanilla JS, talks to the NestJS API) */
(function () {
  'use strict';

  const API = '/api';
  const state = {
    token: localStorage.getItem('smugs_token') || '',
    user: JSON.parse(localStorage.getItem('smugs_user') || 'null'),
    tab: 'overview',
    stats: null,
    bookings: { items: [], total: 0, page: 1, pages: 1 },
    filters: { status: 'all', search: '', page: 1 },
    tours: [],
    destinations: [],
    videos: [],
    videoFilters: { tag: 'all', search: '' },
  };

  /* ---------------- helpers ---------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = (value) =>
    String(value === null || value === undefined ? '' : value).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]),
    );

  let toastTimer;
  function toast(message, isError) {
    const el = $('#toast');
    el.textContent = message;
    el.className = 'toast' + (isError ? ' err' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 2600);
  }

  async function api(path, options) {
    const opts = options || {};
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (state.token) headers.Authorization = 'Bearer ' + state.token;

    const res = await fetch(API + path, { ...opts, headers });
    if (res.status === 401) {
      logout(false);
      throw new Error('Session expired. Please sign in again.');
    }
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const message = Array.isArray(data?.message)
        ? data.message.join(', ')
        : data?.message || 'Request failed';
      throw new Error(message);
    }
    return data;
  }

  function openModal(title, body, footer) {
    $('#modal-box').innerHTML =
      '<div class="modal-head"><h3>' +
      esc(title) +
      '</h3><button class="x" data-close>&times;</button></div>' +
      '<div class="modal-body">' +
      body +
      '</div>' +
      (footer ? '<div class="modal-foot">' + footer + '</div>' : '');
    $('#modal-root').classList.remove('hidden');
  }
  function closeModal() {
    $('#modal-root').classList.add('hidden');
    $('#modal-box').innerHTML = '';
  }

  const money = (n) => '$' + Number(n || 0).toLocaleString();
  const dateFmt = (value) => (value ? new Date(value).toLocaleString() : '-');
  const STATUS_LABELS = {
    new: 'New',
    contacted: 'Contacted',
    quoted: 'Quoted',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  /* ---------------- auth ---------------- */
  function showLogin() {
    $('#login-view').classList.remove('hidden');
    $('#app-view').classList.add('hidden');
  }

  function showApp() {
    $('#login-view').classList.add('hidden');
    $('#app-view').classList.remove('hidden');
    $('#whoami').textContent = state.user ? state.user.email : '';
    navigate(state.tab);
  }

  function logout(callApi) {
    if (callApi !== false) localStorage.removeItem('smugs_token');
    state.token = '';
    state.user = null;
    localStorage.removeItem('smugs_token');
    localStorage.removeItem('smugs_user');
    showLogin();
  }

  $('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorEl = $('#login-error');
    errorEl.classList.add('hidden');
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: $('#login-email').value.trim(),
          password: $('#login-password').value,
        }),
      });
      state.token = data.accessToken;
      state.user = data.user;
      localStorage.setItem('smugs_token', state.token);
      localStorage.setItem('smugs_user', JSON.stringify(state.user));
      $('#login-password').value = '';
      showApp();
    } catch (err) {
      errorEl.textContent = err.message;
      errorEl.classList.remove('hidden');
    }
  });

  $('#logout').addEventListener('click', () => logout());

  /* ---------------- navigation ---------------- */
  $('#nav').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-tab]');
    if (btn) navigate(btn.dataset.tab);
  });

  function navigate(tab) {
    state.tab = tab;
    document.querySelectorAll('#nav button').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    $('#page-title').textContent = {
      overview: 'Overview',
      bookings: 'Bookings',
      tours: 'Tours & Pricing',
      destinations: 'Destinations',
      videos: 'Videos & Media',
      settings: 'Settings',
    }[tab];
    $('#topbar-actions').innerHTML = '';
    render();
  }

  async function render() {
    const content = $('#content');
    content.innerHTML = '<div class="empty">Loading…</div>';
    try {
      if (state.tab === 'overview') await renderOverview(content);
      else if (state.tab === 'bookings') await renderBookings(content);
      else if (state.tab === 'tours') await renderTours(content);
      else if (state.tab === 'destinations') await renderDestinations(content);
      else if (state.tab === 'videos') await renderVideos(content);
      else renderSettings(content);
    } catch (err) {
      content.innerHTML = '<div class="empty">' + esc(err.message) + '</div>';
    }
  }

  /* ---------------- overview ---------------- */
  async function renderOverview(content) {
    const stats = await api('/stats');
    state.stats = stats;
    const badge = $('#nav-new-badge');
    if (stats.bookings.newCount > 0) {
      badge.textContent = stats.bookings.newCount;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }

    const statusChips = Object.keys(STATUS_LABELS)
      .map(
        (key) =>
          '<div class="stat"><div class="label">' +
          STATUS_LABELS[key] +
          '</div><div class="value">' +
          (stats.byStatus[key] || 0) +
          '</div></div>',
      )
      .join('');

    const recent = stats.recentBookings || [];

    content.innerHTML =
      '<div class="cards">' +
      '<div class="stat"><div class="label">Total bookings</div><div class="value">' +
      stats.bookings.total +
      '</div><div class="sub">All time</div></div>' +
      '<div class="stat"><div class="label">New (awaiting)</div><div class="value">' +
      stats.bookings.newCount +
      '</div><div class="sub">Need a reply</div></div>' +
      '<div class="stat"><div class="label">Last 7 days</div><div class="value">' +
      stats.bookings.newLast7Days +
      '</div><div class="sub">New inquiries</div></div>' +
      '<div class="stat"><div class="label">Tours &amp; Dests</div><div class="value">' +
      stats.tours +
      '</div><div class="sub">' + stats.destinations + ' destinations</div></div>' +
      '<div class="stat"><div class="label">Videos &amp; Media</div><div class="value">' +
      (stats.videos || 0) +
      '</div><div class="sub">Safari Theater &amp; Gallery</div></div>' +
      '</div>' +
      '<div class="cards">' +
      statusChips +
      '</div>' +
      '<div class="panel"><div class="panel-head"><h3>Recent bookings</h3>' +
      '<button class="btn btn-sm" data-goto="bookings">View all</button></div>' +
      '<div class="panel-body">' +
      (recent.length
        ? bookingTable(recent, false)
        : '<div class="empty">No bookings yet. They will appear here as soon as the website form is connected.</div>') +
      '</div></div>';
  }

  /* ---------------- bookings ---------------- */
  function bookingTable(items, withCheckbox) {
    const rows = items
      .map(
        (b) =>
          '<tr class="clickable" data-booking="' +
          esc(b._id) +
          '">' +
          (withCheckbox ? '<td><input type="checkbox" data-select="' + esc(b._id) + '"></td>' : '') +
          '<td><strong>' +
          esc(b.reference) +
          '</strong></td>' +
          '<td>' +
          esc(b.fullName) +
          '<br><small style="color:#9ca3af">' +
          esc(b.email) +
          '</small></td>' +
          '<td>' +
          esc(b.tourTitle || 'Custom / General') +
          (b.travelDate ? '<br><small style="color:#9ca3af">' + esc(b.travelDate) + '</small>' : '') +
          '</td>' +
          '<td>' +
          esc(b.adults) +
          'A / ' +
          esc(b.children) +
          'C</td>' +
          '<td><span class="pill ' +
          esc(b.status) +
          '">' +
          STATUS_LABELS[b.status] +
          '</span></td>' +
          '<td>' +
          dateFmt(b.createdAt) +
          '</td>' +
          '</tr>',
      )
      .join('');

    return (
      '<table><thead><tr>' +
      (withCheckbox ? '<th style="width:34px"><input type="checkbox" id="select-all"></th>' : '') +
      '<th>Ref</th><th>Guest</th><th>Tour</th><th>Guests</th><th>Status</th><th>Received</th>' +
      '</tr></thead><tbody>' +
      rows +
      '</tbody></table>'
    );
  }

  async function renderBookings(content) {
    $('#topbar-actions').innerHTML =
      '<button class="btn btn-sm" id="export-csv">Export CSV</button> ' +
      '<button class="btn btn-sm btn-primary" id="new-booking">+ Manual booking</button>';

    const query =
      '?status=' +
      encodeURIComponent(state.filters.status) +
      '&search=' +
      encodeURIComponent(state.filters.search) +
      '&page=' +
      state.filters.page +
      '&limit=25';

    const data = await api('/bookings' + query);
    state.bookings = data;

    const statusOptions = ['all']
      .concat(Object.keys(STATUS_LABELS))
      .map(
        (s) =>
          '<option value="' +
          s +
          '"' +
          (state.filters.status === s ? ' selected' : '') +
          '>' +
          (s === 'all' ? 'All statuses' : STATUS_LABELS[s]) +
          '</option>',
      )
      .join('');

    content.innerHTML =
      '<div class="panel"><div class="panel-head">' +
      '<strong>' +
      data.total +
      ' booking' +
      (data.total === 1 ? '' : 's') +
      '</strong>' +
      '<div class="filters">' +
      '<input id="search" placeholder="Search name, email, ref…" value="' +
      esc(state.filters.search) +
      '">' +
      '<select id="status-filter">' +
      statusOptions +
      '</select>' +
      '</div></div><div class="panel-body">' +
      (data.items.length ? bookingTable(data.items, true) : '<div class="empty">No bookings match.</div>') +
      '</div></div>' +
      (data.pages > 1
        ? '<div class="filters" style="justify-content:center">' +
          '<button class="btn btn-sm" data-page="' +
          Math.max(1, data.page - 1) +
          '"' +
          (data.page === 1 ? ' disabled' : '') +
          '>Prev</button>' +
          '<span>Page ' +
          data.page +
          ' of ' +
          data.pages +
          '</span>' +
          '<button class="btn btn-sm" data-page="' +
          data.page +
          '" data-next="1"' +
          (data.page === data.pages ? ' disabled' : '') +
          '>Next</button></div>'
        : '');

    let searchTimer;
    $('#search').addEventListener('input', (e) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.filters.search = e.target.value.trim();
        state.filters.page = 1;
        render();
      }, 350);
    });
    $('#status-filter').addEventListener('change', (e) => {
      state.filters.status = e.target.value;
      state.filters.page = 1;
      render();
    });
    $('#export-csv').addEventListener('click', exportCsv);
    $('#new-booking').addEventListener('click', () => manualBookingModal());
    const selectAll = $('#select-all');
    if (selectAll) {
      selectAll.addEventListener('change', () => {
        document.querySelectorAll('[data-select]').forEach((cb) => {
          cb.checked = selectAll.checked;
        });
      });
    }
  }

  function bookingDetailModal(id) {
    const booking = [...state.bookings.items, ...(state.stats?.recentBookings || [])].find(
      (b) => b._id === id,
    );
    if (!booking) return;

    const statusOptions = Object.keys(STATUS_LABELS)
      .map(
        (s) =>
          '<option value="' +
          s +
          '"' +
          (booking.status === s ? ' selected' : '') +
          '>' +
          STATUS_LABELS[s] +
          '</option>',
      )
      .join('');

    openModal(
      'Booking ' + booking.reference,
      '<div class="kv"><div class="k">Guest</div><div>' +
        esc(booking.fullName) +
        '</div></div>' +
        '<div class="kv"><div class="k">Email</div><div>' +
        esc(booking.email) +
        '</div></div>' +
        '<div class="kv"><div class="k">Phone</div><div>' +
        esc(booking.phone) +
        '</div></div>' +
        '<div class="kv"><div class="k">Tour</div><div>' +
        esc(booking.tourTitle || booking.tourId || 'Custom / General') +
        '</div></div>' +
        '<div class="kv"><div class="k">Travel date</div><div>' +
        esc(booking.travelDate || 'Flexible') +
        '</div></div>' +
        '<div class="kv"><div class="k">Guests</div><div>' +
        esc(booking.adults) +
        ' adults, ' +
        esc(booking.children) +
        ' children</div></div>' +
        '<div class="kv"><div class="k">Tier</div><div>' +
        esc(booking.tier || '-') +
        '</div></div>' +
        '<div class="kv"><div class="k">Source</div><div>' +
        esc(booking.source) +
        '</div></div>' +
        '<div class="kv"><div class="k">Received</div><div>' +
        dateFmt(booking.createdAt) +
        '</div></div>' +
        '<div class="form-grid" style="margin-top:16px">' +
        '<div class="field"><label>Status</label><select id="b-status">' +
        statusOptions +
        '</select></div>' +
        '<div class="field"><label>Quote (USD)</label><input id="b-quote" type="number" min="0" value="' +
        (booking.priceQuotedUSD ?? '') +
        '"></div>' +
        '<div class="field full"><label>Special requests</label><textarea readonly rows="2">' +
        esc(booking.specialRequests || '—') +
        '</textarea></div>' +
        '<div class="field full"><label>Internal notes</label><textarea id="b-notes" rows="3">' +
        esc(booking.notes || '') +
        '</textarea></div>' +
        '</div>',
      '<button class="btn btn-danger" id="b-delete">Delete</button>' +
        '<button class="btn" data-close>Cancel</button>' +
        '<button class="btn btn-primary" id="b-save">Save changes</button>',
    );

    $('#b-save').addEventListener('click', async () => {
      try {
        const quote = $('#b-quote').value;
        await api('/bookings/' + booking._id, {
          method: 'PATCH',
          body: JSON.stringify({
            status: $('#b-status').value,
            notes: $('#b-notes').value,
            ...(quote !== '' ? { priceQuotedUSD: Number(quote) } : {}),
          }),
        });
        toast('Booking updated');
        closeModal();
        render();
      } catch (err) {
        toast(err.message, true);
      }
    });

    $('#b-delete').addEventListener('click', async () => {
      if (!confirm('Delete booking ' + booking.reference + '? This cannot be undone.')) return;
      try {
        await api('/bookings/' + booking._id, { method: 'DELETE' });
        toast('Booking deleted');
        closeModal();
        render();
      } catch (err) {
        toast(err.message, true);
      }
    });
  }

  function manualBookingModal() {
    openModal(
      'Add booking manually',
      '<div class="form-grid">' +
        field('Full name', '<input id="m-name" required>', true) +
        field('Email', '<input id="m-email" type="email" required>') +
        field('Phone', '<input id="m-phone" required>') +
        field('Travel date', '<input id="m-date" type="date">') +
        field('Adults', '<input id="m-adults" type="number" min="1" value="2">') +
        field('Children', '<input id="m-children" type="number" min="0" value="0">') +
        field('Tour / package', '<input id="m-tour" placeholder="e.g. 7-Day Classic Kenya Big Five">', false, true) +
        field('Tier', '<input id="m-tier" value="Mid-Range Comfort">', false, true) +
        field('Notes', '<textarea id="m-notes" rows="3"></textarea>', false, true) +
        '</div>',
      '<button class="btn" data-close>Cancel</button><button class="btn btn-primary" id="m-save">Create booking</button>',
    );

    $('#m-save').addEventListener('click', async () => {
      try {
        await api('/bookings/manual', {
          method: 'POST',
          body: JSON.stringify({
            fullName: $('#m-name').value.trim(),
            email: $('#m-email').value.trim(),
            phone: $('#m-phone').value.trim(),
            travelDate: $('#m-date').value,
            adults: Number($('#m-adults').value) || 1,
            children: Number($('#m-children').value) || 0,
            tourTitle: $('#m-tour').value.trim(),
            tier: $('#m-tier').value.trim(),
            specialRequests: $('#m-notes').value.trim(),
          }),
        });
        toast('Booking created');
        closeModal();
        render();
      } catch (err) {
        toast(err.message, true);
      }
    });
  }

  function field(label, input, required, full) {
    return (
      '<div class="field' +
      (full ? ' full' : '') +
      '"><label>' +
      esc(label) +
      (required ? ' *' : '') +
      '</label>' +
      input +
      '</div>'
    );
  }

  function exportCsv() {
    const rows = [
      ['Reference', 'Name', 'Email', 'Phone', 'Tour', 'Travel date', 'Adults', 'Children', 'Tier', 'Status', 'Quote USD', 'Notes', 'Created'],
    ].concat(
      state.bookings.items.map((b) => [
        b.reference,
        b.fullName,
        b.email,
        b.phone,
        b.tourTitle || b.tourId || '',
        b.travelDate || '',
        b.adults,
        b.children,
        b.tier || '',
        b.status,
        b.priceQuotedUSD ?? '',
        (b.notes || '').replace(/\n/g, ' '),
        b.createdAt,
      ]),
    );
    const csv = rows
      .map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'smugs-bookings.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  /* ---------------- tours & pricing ---------------- */
  async function renderTours(content) {
    $('#topbar-actions').innerHTML = '<button class="btn btn-sm btn-primary" id="add-tour">+ New tour</button>';
    state.tours = await api('/tours');

    const rows = state.tours
      .map(
        (t) =>
          '<tr>' +
          '<td><strong>' +
          esc(t.title) +
          '</strong><br><small style="color:#9ca3af">' +
          esc(t.duration || '') +
          ' · ' +
          esc(t.tier || '') +
          '</small></td>' +
          '<td><span class="price">' +
          money(t.priceUSD) +
          '</span>' +
          (t.originalPriceUSD ? '<span class="was">' + money(t.originalPriceUSD) + '</span>' : '') +
          '</td>' +
          '<td>' +
          esc((t.destinations || []).join(', ')) +
          '</td>' +
          '<td>' +
          '<span class="pill ' + (t.featured ? 'confirmed' : 'cancelled') + '" data-toggle="featured" data-id="' + esc(t.id) + '" style="cursor:pointer">' +
          (t.featured ? 'Featured' : 'Not featured') +
          '</span> ' +
          '<span class="pill ' + (t.bestSeller ? 'gold' : 'cancelled') + '" data-toggle="bestSeller" data-id="' + esc(t.id) + '" style="cursor:pointer">' +
          (t.bestSeller ? 'Best seller' : 'Regular') +
          '</span></td>' +
          '<td style="text-align:right;white-space:nowrap">' +
          '<button class="btn btn-sm" data-edit-tour="' +
          esc(t.id) +
          '">Edit pricing</button> ' +
          '<button class="btn btn-sm btn-danger" data-del-tour="' +
          esc(t.id) +
          '">Delete</button></td>' +
          '</tr>',
      )
      .join('');

    content.innerHTML =
      '<div class="panel"><div class="panel-head"><strong>' +
      state.tours.length +
      ' tour packages</strong><span style="color:#6b7280;font-size:12.5px">Prices are stored in USD and shown to visitors in their selected currency.</span></div>' +
      '<div class="panel-body"><table><thead><tr><th>Tour</th><th>Price (per person)</th><th>Destinations</th><th>Flags</th><th></th></tr></thead><tbody>' +
      rows +
      '</tbody></table></div></div>';
  }

  function tourModal(id) {
    const tour = state.tours.find((t) => t.id === id);
    if (!tour) return;
    openModal(
      'Edit pricing · ' + tour.title,
      '<div class="form-grid">' +
        field('Price USD (per person)', '<input id="t-price" type="number" min="0" value="' + esc(tour.priceUSD) + '">', true) +
        field('Original / was price USD', '<input id="t-original" type="number" min="0" value="' + esc(tour.originalPriceUSD ?? '') + '">') +
        field('Duration (label)', '<input id="t-duration" value="' + esc(tour.duration || '') + '">') +
        field('Duration (days)', '<input id="t-days" type="number" min="1" value="' + esc(tour.durationDays || 1) + '">') +
        field('Tier', '<select id="t-tier">' +
          ['Budget Camping', 'Mid-Range Comfort', 'Luxury Tented Camp']
            .map((o) => '<option' + (tour.tier === o ? ' selected' : '') + '>' + o + '</option>')
            .join('') +
          '</select>') +
        field('Physical rating', '<select id="t-rating">' +
          ['Easy', 'Moderate', 'Active']
            .map((o) => '<option' + (tour.physicalRating === o ? ' selected' : '') + '>' + o + '</option>')
            .join('') +
          '</select>') +
        field('Tagline', '<input id="t-tagline" value="' + esc(tour.tagline || '') + '">', false, true) +
        field('Video URL or Local Path', '<input id="t-video" value="' + esc(tour.video || '') + '" placeholder="/videos/lion-pride.mp4 or https://...">', false, true) +
        field('Overview', '<textarea id="t-overview" rows="4">' + esc(tour.overview || '') + '</textarea>', false, true) +
        '</div>',
      '<button class="btn" data-close>Cancel</button><button class="btn btn-primary" id="t-save">Save changes</button>',
    );

    $('#t-save').addEventListener('click', async () => {
      try {
        await api('/tours/' + tour.id, {
          method: 'PATCH',
          body: JSON.stringify({
            priceUSD: Number($('#t-price').value) || 0,
            originalPriceUSD: $('#t-original').value === '' ? null : Number($('#t-original').value),
            duration: $('#t-duration').value,
            durationDays: Number($('#t-days').value) || 1,
            tier: $('#t-tier').value,
            physicalRating: $('#t-rating').value,
            tagline: $('#t-tagline').value,
            video: $('#t-video').value.trim(),
            overview: $('#t-overview').value,
          }),
        });
        toast('Pricing updated');
        closeModal();
        render();
      } catch (err) {
        toast(err.message, true);
      }
    });
  }

  function newTourModal() {
    openModal(
      'New tour package',
      '<div class="form-grid">' +
        field('Title', '<input id="n-title" placeholder="5-Day Amboseli & Tsavo Safari">', true, true) +
        field('Price USD', '<input id="n-price" type="number" min="0" value="1000">', true) +
        field('Original price USD', '<input id="n-original" type="number" min="0">') +
        field('Duration (label)', '<input id="n-duration" placeholder="5 Days / 4 Nights">') +
        field('Duration (days)', '<input id="n-days" type="number" min="1" value="5">') +
        field('Destinations (comma separated)', '<input id="n-dest" placeholder="Amboseli, Tsavo East">', false, true) +
        field('Video URL or Local Path', '<input id="n-video" placeholder="/videos/lion-pride.mp4 or https://...">', false, true) +
        field('Tagline', '<input id="n-tagline">', false, true) +
        '</div>',
      '<button class="btn" data-close>Cancel</button><button class="btn btn-primary" id="n-save">Create tour</button>',
    );

    $('#n-save').addEventListener('click', async () => {
      try {
        const destinations = $('#n-dest').value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        await api('/tours', {
          method: 'POST',
          body: JSON.stringify({
            title: $('#n-title').value.trim(),
            priceUSD: Number($('#n-price').value) || 0,
            originalPriceUSD: $('#n-original').value === '' ? null : Number($('#n-original').value),
            duration: $('#n-duration').value.trim(),
            durationDays: Number($('#n-days').value) || 1,
            destinations,
            video: $('#n-video').value.trim(),
            tagline: $('#n-tagline').value.trim(),
          }),
        });
        toast('Tour created');
        closeModal();
        render();
      } catch (err) {
        toast(err.message, true);
      }
    });
  }

  /* ---------------- destinations ---------------- */
  async function renderDestinations(content) {
    $('#topbar-actions').innerHTML =
      '<button class="btn btn-sm btn-primary" id="add-dest">+ New destination</button>';
    state.destinations = await api('/destinations');

    const cards = state.destinations
      .map(
        (d) =>
          '<div class="panel" style="margin-bottom:14px"><div class="panel-head">' +
          '<div><strong>' +
          esc(d.name) +
          '</strong> <span style="color:#6b7280;font-size:12.5px">' +
          esc(d.country) +
          '</span></div>' +
          '<div><button class="btn btn-sm" data-edit-dest="' +
          esc(d.id) +
          '">Edit</button> <button class="btn btn-sm btn-danger" data-del-dest="' +
          esc(d.id) +
          '">Delete</button></div></div>' +
          '<div class="panel-body pad">' +
          '<p style="margin:0 0 10px;color:#4b5563">' +
          esc(d.tagline || d.description || 'No description yet.') +
          '</p>' +
          '<div class="kv"><div class="k">Best time</div><div>' +
          esc(d.bestTimeToVisit || '—') +
          '</div></div>' +
          '<div class="kv"><div class="k">Wildlife</div><div>' +
          esc((d.keyWildlife || []).join(', ') || '—') +
          '</div></div>' +
          '<div class="kv"><div class="k">Related tours</div><div>' +
          esc((d.relatedTourIds || []).join(', ') || '—') +
          '</div></div>' +
          '</div></div>',
      )
      .join('');

    content.innerHTML =
      '<div class="split"><div>' +
      (cards || '<div class="empty">No destinations yet.</div>') +
      '</div><div><div class="panel"><div class="panel-head"><h3>About destinations</h3></div>' +
      '<div class="panel-body pad" style="color:#4b5563;font-size:13px">' +
      'Destinations here are the source of truth for the website\'s destinations section once the frontend is connected. ' +
      'You can add, edit or remove them at any time without touching the site code.' +
      '</div></div></div></div>';
  }

  function destinationModal(id) {
    const dest = id ? state.destinations.find((d) => d.id === id) : null;
    const value = (v) => esc(v || '');
    openModal(
      dest ? 'Edit destination · ' + dest.name : 'New destination',
      '<div class="form-grid">' +
        field('Name', '<input id="d-name" value="' + value(dest?.name) + '">', true) +
        field('Country', '<input id="d-country" value="' + value(dest?.country) + '">') +
        field('Tagline', '<input id="d-tagline" value="' + value(dest?.tagline) + '">', false, true) +
        field('Description', '<textarea id="d-desc" rows="4">' + value(dest?.description) + '</textarea>', false, true) +
        field('Best time to visit', '<input id="d-time" value="' + value(dest?.bestTimeToVisit) + '">', false, true) +
        field('Key wildlife (comma separated)', '<input id="d-wildlife" value="' + value((dest?.keyWildlife || []).join(', ')) + '">', false, true) +
        field('Highlights (comma separated)', '<input id="d-highlights" value="' + value((dest?.highlights || []).join(', ')) + '">', false, true) +
        field('Image URL', '<input id="d-image" value="' + value(dest?.image) + '">', false, true) +
        field('Video URL or Local Path', '<input id="d-video" value="' + value(dest?.video) + '" placeholder="/videos/lake-wildlife.mp4 or https://...">', false, true) +
        '</div>',
      '<button class="btn" data-close>Cancel</button><button class="btn btn-primary" id="d-save">Save</button>',
    );

    $('#d-save').addEventListener('click', async () => {
      const list = (v) => v.split(',').map((s) => s.trim()).filter(Boolean);
      const payload = {
        name: $('#d-name').value.trim(),
        country: $('#d-country').value.trim(),
        tagline: $('#d-tagline').value.trim(),
        description: $('#d-desc').value.trim(),
        bestTimeToVisit: $('#d-time').value.trim(),
        keyWildlife: list($('#d-wildlife').value),
        highlights: list($('#d-highlights').value),
        image: $('#d-image').value.trim(),
        video: $('#d-video').value.trim(),
      };
      try {
        if (dest) await api('/destinations/' + dest.id, { method: 'PATCH', body: JSON.stringify(payload) });
        else await api('/destinations', { method: 'POST', body: JSON.stringify(payload) });
        toast(dest ? 'Destination updated' : 'Destination created');
        closeModal();
        render();
      } catch (err) {
        toast(err.message, true);
      }
    });
  }

  /* ---------------- videos & media ---------------- */
  async function renderVideos(content) {
    $('#topbar-actions').innerHTML =
      '<button class="btn btn-sm btn-primary" id="add-video">+ New video</button>';

    let path = '/videos';
    const params = [];
    if (state.videoFilters.tag && state.videoFilters.tag !== 'all') {
      params.push('destinationTag=' + encodeURIComponent(state.videoFilters.tag));
    }
    if (state.videoFilters.search) {
      params.push('search=' + encodeURIComponent(state.videoFilters.search));
    }
    if (params.length) path += '?' + params.join('&');

    state.videos = await api(path);

    const filterBar =
      '<div class="filters" style="margin-bottom:18px">' +
      '<input id="vf-search" placeholder="Search videos by title, location..." value="' + esc(state.videoFilters.search) + '">' +
      '<select id="vf-tag">' +
      ['all', 'Maasai Mara', 'Amboseli', 'Samburu', 'Tsavo', 'Rift Valley', 'Coast & Culture', 'Serengeti']
        .map((t) => '<option value="' + t + '"' + (state.videoFilters.tag === t ? ' selected' : '') + '>' + (t === 'all' ? 'All Destination Tags' : t) + '</option>')
        .join('') +
      '</select>' +
      '</div>';

    const cards = state.videos
      .map(
        (v) =>
          '<div class="video-card">' +
          '<div class="video-player-box">' +
          '<video controls preload="metadata" src="' + esc(v.videoSrc) + '"' + (v.poster ? ' poster="' + esc(v.poster) + '"' : '') + '></video>' +
          '</div>' +
          '<div class="video-card-body">' +
          '<div class="video-badges">' +
          '<span class="tag-pill">' + esc(v.destinationTag || 'General') + '</span>' +
          '<span class="tag-pill" style="background:#e0f2fe;color:#0369a1">' + esc(v.duration || '0:30') + '</span>' +
          '<span class="tag-pill" style="background:#fef3c7;color:#92400e">' + esc(v.resolution || 'HD') + '</span>' +
          '<span class="pill ' + (v.featured ? 'confirmed' : 'cancelled') + '" data-toggle-video-feat="' + esc(v.id) + '" style="cursor:pointer;margin-left:auto">' +
          (v.featured ? 'Featured' : 'Regular') +
          '</span>' +
          '</div>' +
          '<h4>' + esc(v.title) + '</h4>' +
          '<div class="video-loc">📍 ' + esc(v.location || v.country || 'East Africa') + '</div>' +
          '<div class="video-caption">' + esc(v.caption || v.fieldNotes || 'Safari video capture.') + '</div>' +
          (v.wildlife && v.wildlife.length ? '<div style="margin-bottom:10px;display:flex;gap:4px;flex-wrap:wrap">' + v.wildlife.map((w) => '<span class="tag-pill" style="font-size:10px;background:#ecfdf5;color:#065f46">🐾 ' + esc(w) + '</span>').join('') + '</div>' : '') +
          '<div style="font-size:11px;color:#9ca3af;margin-bottom:8px;font-family:monospace;overflow:hidden;text-overflow:ellipsis" title="' + esc(v.videoSrc) + '">SRC: ' + esc(v.videoSrc) + '</div>' +
          '<div class="video-card-foot">' +
          '<button class="btn btn-sm" data-edit-video="' + esc(v.id) + '">Edit details</button>' +
          '<button class="btn btn-sm btn-danger" data-del-video="' + esc(v.id) + '">Delete</button>' +
          '</div>' +
          '</div>' +
          '</div>'
      )
      .join('');

    content.innerHTML =
      filterBar +
      (cards ? '<div class="video-grid">' + cards + '</div>' : '<div class="empty">No videos found matching filters.</div>');

    $('#add-video').addEventListener('click', () => videoModal());

    $('#vf-search').addEventListener('input', (e) => {
      state.videoFilters.search = e.target.value.trim();
      renderVideos(content);
    });

    $('#vf-tag').addEventListener('change', (e) => {
      state.videoFilters.tag = e.target.value;
      renderVideos(content);
    });

    content.querySelectorAll('[data-edit-video]').forEach((btn) => {
      btn.addEventListener('click', () => videoModal(btn.dataset.editVideo));
    });

    content.querySelectorAll('[data-del-video]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.delVideo;
        if (!confirm('Are you sure you want to delete this video?')) return;
        try {
          await api('/videos/' + id, { method: 'DELETE' });
          toast('Video deleted');
          render();
        } catch (err) {
          toast(err.message, true);
        }
      });
    });

    content.querySelectorAll('[data-toggle-video-feat]').forEach((pill) => {
      pill.addEventListener('click', async () => {
        const id = pill.dataset.toggleVideoFeat;
        const video = state.videos.find((x) => x.id === id);
        if (!video) return;
        try {
          await api('/videos/' + id, {
            method: 'PATCH',
            body: JSON.stringify({ featured: !video.featured }),
          });
          toast('Video updated');
          render();
        } catch (err) {
          toast(err.message, true);
        }
      });
    });
  }

  function videoModal(id) {
    const video = id ? state.videos.find((v) => v.id === id) : null;
    const value = (v) => esc(v || '');

    const videoPresets = [
      '/videos/lion-pride.mp4',
      '/videos/elephant-herd.mp4',
      '/videos/migration-crossing.mp4',
      '/videos/cheetah-wild.mp4',
      '/videos/giraffe-savanna.mp4',
      '/videos/tsavo-sunset.mp4',
      '/videos/lake-wildlife.mp4',
      '/videos/safari-hero-bg.mp4',
      '/videos/safari-landscape.mp4',
    ];

    openModal(
      video ? 'Edit video · ' + video.title : 'New video',
      '<div class="form-grid">' +
        field('Title', '<input id="v-title" value="' + value(video?.title) + '" placeholder="e.g. Serengeti Great Migration Crossing">', true, true) +
        field('Video URL or Local Path', '<input id="v-src" value="' + value(video?.videoSrc) + '" placeholder="/videos/lion-pride.mp4 or https://...">', true, true) +
        '<div class="field full"><label>Quick pick local asset</label><select id="v-preset"><option value="">-- Choose local video asset or enter URL above --</option>' +
        videoPresets.map((p) => '<option value="' + p + '">' + p + '</option>').join('') +
        '</select></div>' +
        field('Thumbnail / Poster URL', '<input id="v-poster" value="' + value(video?.poster) + '" placeholder="/video-thumbs/lion-pride.jpg or image URL">', false, true) +
        field('Destination tag', '<select id="v-dest">' +
          ['Maasai Mara', 'Amboseli', 'Samburu', 'Tsavo', 'Rift Valley', 'Coast & Culture', 'Serengeti', 'Ngorongoro', 'Zanzibar']
            .map((t) => '<option' + (video?.destinationTag === t ? ' selected' : '') + '>' + t + '</option>')
            .join('') +
          '</select>') +
        field('Location', '<input id="v-loc" value="' + value(video?.location || 'Maasai Mara National Reserve, Kenya') + '">') +
        field('Duration (e.g. 0:15)', '<input id="v-duration" value="' + value(video?.duration || '0:15') + '">') +
        field('Resolution', '<input id="v-res" value="' + value(video?.resolution || 'Full HD 1080p') + '">') +
        field('Soundscape effect', '<select id="v-sound">' +
          ['savannah-ambient', 'lion-roar', 'elephant-trumpet', 'migration-stampede', 'cheetah-chirp', 'hippo-grunt', 'savannah-night']
            .map((s) => '<option' + (video?.soundType === s ? ' selected' : '') + '>' + s + '</option>')
            .join('') +
          '</select>') +
        field('Sound title', '<input id="v-sound-title" value="' + value(video?.soundTitle || 'Savannah Wind & Birds') + '">') +
        field('Key wildlife (comma separated)', '<input id="v-wildlife" value="' + value((video?.wildlife || []).join(', ')) + '" placeholder="African Lion, Cheetah, Zebra">', false, true) +
        field('Caption / Summary', '<textarea id="v-caption" rows="2" placeholder="Brief visual caption...">' + value(video?.caption) + '</textarea>', false, true) +
        field('Field notes (optional)', '<textarea id="v-notes" rows="2" placeholder="Guide notes, conservation context...">' + value(video?.fieldNotes) + '</textarea>', false, true) +
        '<div class="field full"><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="v-feat"' + (video?.featured ? ' checked' : '') + '> <span>Mark as Featured (highlighted in Safari Theater &amp; Gallery)</span></label></div>' +
        '</div>',
      '<button class="btn" data-close>Cancel</button><button class="btn btn-primary" id="v-save">Save video</button>'
    );

    $('#v-preset').addEventListener('change', (e) => {
      if (e.target.value) $('#v-src').value = e.target.value;
    });

    $('#v-save').addEventListener('click', async () => {
      const title = $('#v-title').value.trim();
      const videoSrc = $('#v-src').value.trim();
      if (!title || !videoSrc) {
        toast('Title and Video URL are required', true);
        return;
      }
      const list = (v) => v.split(',').map((s) => s.trim()).filter(Boolean);
      const payload = {
        title,
        videoSrc,
        poster: $('#v-poster').value.trim(),
        destinationTag: $('#v-dest').value,
        location: $('#v-loc').value.trim(),
        duration: $('#v-duration').value.trim(),
        resolution: $('#v-res').value.trim(),
        soundType: $('#v-sound').value,
        soundTitle: $('#v-sound-title').value.trim(),
        wildlife: list($('#v-wildlife').value),
        caption: $('#v-caption').value.trim(),
        fieldNotes: $('#v-notes').value.trim(),
        featured: $('#v-feat').checked,
      };
      try {
        if (video) await api('/videos/' + video.id, { method: 'PATCH', body: JSON.stringify(payload) });
        else await api('/videos', { method: 'POST', body: JSON.stringify(payload) });
        toast(video ? 'Video updated' : 'Video created');
        closeModal();
        render();
      } catch (err) {
        toast(err.message, true);
      }
    });
  }

  /* ---------------- settings ---------------- */
  function renderSettings(content) {
    $('#topbar-actions').innerHTML = '';
    content.innerHTML =
      '<div class="split">' +
      '<div class="panel"><div class="panel-head"><h3>Change password</h3></div><div class="panel-body pad">' +
      '<div class="form-grid">' +
      field('Current password', '<input id="s-current" type="password">', true, true) +
      field('New password (min 6 chars)', '<input id="s-new" type="password">', true, true) +
      '</div><div style="margin-top:14px"><button class="btn btn-primary" id="s-save">Update password</button></div>' +
      '</div></div>' +
      '<div class="panel"><div class="panel-head"><h3>API status</h3></div><div class="panel-body pad">' +
      '<div class="kv"><div class="k">API base</div><div>/api</div></div>' +
      '<div class="kv"><div class="k">Public submit</div><div>POST /api/bookings</div></div>' +
      '<div class="kv"><div class="k">Tours</div><div>GET /api/tours</div></div>' +
      '<div class="kv"><div class="k">Destinations</div><div>GET /api/destinations</div></div>' +
      '<div class="kv"><div class="k">Videos</div><div>GET /api/videos</div></div>' +
      '<p style="color:#6b7280;font-size:12.5px;margin-top:12px">Signed in as ' +
      esc(state.user?.email || '') +
      '</p></div></div></div>';

    $('#s-save').addEventListener('click', async () => {
      try {
        await api('/auth/password', {
          method: 'PATCH',
          body: JSON.stringify({
            currentPassword: $('#s-current').value,
            newPassword: $('#s-new').value,
          }),
        });
        toast('Password updated');
        $('#s-current').value = '';
        $('#s-new').value = '';
      } catch (err) {
        toast(err.message, true);
      }
    });
  }

  /* ---------------- delegated events ---------------- */
  document.addEventListener('click', async (e) => {
    if (e.target.matches('[data-close]') || e.target.classList.contains('modal-backdrop')) {
      closeModal();
      return;
    }

    const goto = e.target.closest('[data-goto]');
    if (goto) return navigate(goto.dataset.goto);

    const pageBtn = e.target.closest('[data-page]');
    if (pageBtn && !pageBtn.disabled) {
      state.filters.page = Number(pageBtn.dataset.page) + (pageBtn.dataset.next ? 1 : 0);
      return render();
    }

    const row = e.target.closest('tr[data-booking]');
    if (row && !e.target.closest('input')) return bookingDetailModal(row.dataset.booking);

    const editTour = e.target.closest('[data-edit-tour]');
    if (editTour) return tourModal(editTour.dataset.editTour);

    const delTour = e.target.closest('[data-del-tour]');
    if (delTour) {
      const id = delTour.dataset.delTour;
      if (confirm('Delete tour "' + id + '"?')) {
        try {
          await api('/tours/' + id, { method: 'DELETE' });
          toast('Tour deleted');
          render();
        } catch (err) { toast(err.message, true); }
      }
      return;
    }

    const toggle = e.target.closest('[data-toggle]');
    if (toggle) {
      const id = toggle.dataset.id;
      const key = toggle.dataset.toggle;
      const tour = state.tours.find((t) => t.id === id);
      if (!tour) return;
      try {
        await api('/tours/' + id, {
          method: 'PATCH',
          body: JSON.stringify({ [key]: !tour[key] }),
        });
        render();
      } catch (err) { toast(err.message, true); }
      return;
    }

    const editDest = e.target.closest('[data-edit-dest]');
    if (editDest) return destinationModal(editDest.dataset.editDest);

    const delDest = e.target.closest('[data-del-dest]');
    if (delDest) {
      const id = delDest.dataset.delDest;
      if (confirm('Delete destination "' + id + '"?')) {
        try {
          await api('/destinations/' + id, { method: 'DELETE' });
          toast('Destination deleted');
          render();
        } catch (err) { toast(err.message, true); }
      }
      return;
    }

    if (e.target.id === 'add-tour') return newTourModal();
    if (e.target.id === 'add-dest') return destinationModal(null);
    if (e.target.id === 'add-video') return videoModal(null);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------------- boot ---------------- */
  if (state.token) showApp();
  else showLogin();
})();
