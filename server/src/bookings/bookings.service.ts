import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './booking.schema';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

const MAX_REQUESTS_PER_WINDOW = 10;
const WINDOW_MS = 10 * 60 * 1000;

const BOOKING_FIELDS = [
  'fullName',
  'email',
  'phone',
  'travelDate',
  'adults',
  'children',
  'tier',
  'tourId',
  'tourTitle',
  'specialRequests',
] as const;

function pickBookingFields(dto: CreateBookingDto): Record<string, any> {
  const picked: Record<string, any> = {};
  for (const field of BOOKING_FIELDS) {
    if ((dto as any)[field] !== undefined) picked[field] = (dto as any)[field];
  }
  return picked;
}

@Injectable()
export class BookingsService {
  private readonly hits = new Map<string, number[]>();

  constructor(@InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>) {}

  private allow(ip: string): boolean {
    const now = Date.now();
    const recent = (this.hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
    if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
      this.hits.set(ip, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(ip, recent);
    return true;
  }

  private async generateReference(): Promise<string> {
    for (let i = 0; i < 12; i += 1) {
      const reference = `SMUG-${Math.floor(100000 + Math.random() * 900000)}`;
      const exists = await this.bookingModel.exists({ reference });
      if (!exists) return reference;
    }
    return `SMUG-${Date.now().toString().slice(-8)}`;
  }

  async create(dto: CreateBookingDto, ip: string) {
    if (!this.allow(ip)) {
      throw new BadRequestException('Too many requests. Please try again later.');
    }

    const reference = await this.generateReference();
    const booking = await this.bookingModel.create({
      ...pickBookingFields(dto),
      reference,
      status: 'new',
      source: 'website',
    });

    return {
      reference: booking.reference,
      id: booking.id,
      message: 'Booking received',
    };
  }

  async createManual(dto: CreateBookingDto) {
    const reference = await this.generateReference();
    const booking = await this.bookingModel.create({
      ...pickBookingFields(dto),
      reference,
      status: 'new',
      source: 'manual',
    });
    return booking;
  }

  async findAll(query: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(200, Math.max(1, Number(query.limit) || 25));
    const filter: Record<string, any> = {};

    if (query.status && query.status !== 'all') filter.status = query.status;
    if (query.search) {
      const regex = new RegExp(String(query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { fullName: regex },
        { email: regex },
        { phone: regex },
        { reference: regex },
        { tourTitle: regex },
      ];
    }

    const [items, total] = await Promise.all([
      this.bookingModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.bookingModel.countDocuments(filter),
    ]);

    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const booking = await this.bookingModel.findById(id).lean();
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async update(id: string, dto: UpdateBookingDto) {
    const booking = await this.bookingModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true, runValidators: true })
      .lean();
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async remove(id: string) {
    const result = await this.bookingModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Booking not found');
    return { success: true };
  }

  async removeMany(ids: string[]) {
    const result = await this.bookingModel.deleteMany({ _id: { $in: ids } });
    return { success: true, deleted: result.deletedCount };
  }
}
