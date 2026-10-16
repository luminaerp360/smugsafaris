import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument, BOOKING_STATUSES } from '../bookings/booking.schema';
import { Tour, TourDocument } from '../tours/tour.schema';
import { Destination, DestinationDocument } from '../destinations/destination.schema';
import { Video, VideoDocument } from '../videos/video.schema';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(Tour.name) private readonly tourModel: Model<TourDocument>,
    @InjectModel(Destination.name) private readonly destinationModel: Model<DestinationDocument>,
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  @Get()
  async getStats() {
    const since = new Date();
    since.setDate(since.getDate() - 7);

    const [total, newCount, recent, byStatus, tours, destinations, videos] =
      await Promise.all([
        this.bookingModel.countDocuments(),
        this.bookingModel.countDocuments({ status: 'new' }),
        this.bookingModel.countDocuments({ createdAt: { $gte: since } }),
        Promise.all(
          BOOKING_STATUSES.map(async (status) => ({
            status,
            count: await this.bookingModel.countDocuments({ status }),
          })),
        ),
        this.tourModel.countDocuments(),
        this.destinationModel.countDocuments(),
        this.videoModel.countDocuments(),
      ]);

    const pipeline = await this.bookingModel
      .aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
      .catch(() => []);

    return {
      bookings: { total, newLast7Days: recent, newCount },
      byStatus: byStatus.reduce((acc, item) => ({ ...acc, [item.status]: item.count }), {}),
      tours,
      destinations,
      videos,
      pipeline,
      recentBookings: await this.bookingModel.find().sort({ createdAt: -1 }).limit(5).lean(),
    };
  }
}
