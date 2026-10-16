import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateBookingDto, @Headers('x-forwarded-for') forwardedFor?: string) {
    const ip = (forwardedFor || 'local').split(',')[0].trim();
    return this.bookingsService.create(dto, ip);
  }

  @Post('manual')
  @UseGuards(JwtAuthGuard)
  createManual(@Body() dto: CreateBookingDto) {
    return this.bookingsService.createManual(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.bookingsService.findAll({ status, search, page, limit });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    return this.bookingsService.update(id, dto);
  }

  @Delete('bulk')
  @UseGuards(JwtAuthGuard)
  removeMany(@Body() body: { ids: string[] }) {
    return this.bookingsService.removeMany(body?.ids || []);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
