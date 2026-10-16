import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { BookingsModule } from './bookings/bookings.module';
import { ToursModule } from './tours/tours.module';
import { DestinationsModule } from './destinations/destinations.module';
import { VideosModule } from './videos/videos.module';
import { StatsModule } from './stats/stats.module';
import { ENV } from './config/env';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.mongoUri, { autoIndex: true }),
    AuthModule,
    BookingsModule,
    ToursModule,
    DestinationsModule,
    VideosModule,
    StatsModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly authService: AuthService) {}

  async onModuleInit() {
    await this.authService.ensureAdminExists();
  }
}
