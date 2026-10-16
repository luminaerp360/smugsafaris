import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsController } from './stats.controller';
import { Booking, BookingSchema } from '../bookings/booking.schema';
import { Tour, TourSchema } from '../tours/tour.schema';
import { Destination, DestinationSchema } from '../destinations/destination.schema';
import { Video, VideoSchema } from '../videos/video.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Tour.name, schema: TourSchema },
      { name: Destination.name, schema: DestinationSchema },
      { name: Video.name, schema: VideoSchema },
    ]),
  ],
  controllers: [StatsController],
})
export class StatsModule {}
