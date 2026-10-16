import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { BOOKING_STATUSES } from '../booking.schema';

const toNumber = ({ value }: { value: any }) => {
  const parsed = parseInt(String(value), 10);
  return Number.isNaN(parsed) ? value : parsed;
};

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  travelDate?: string;

  @IsOptional()
  @Transform(toNumber)
  @IsInt()
  @Min(1)
  @Max(99)
  adults?: number;

  @IsOptional()
  @Transform(toNumber)
  @IsInt()
  @Min(0)
  @Max(50)
  children?: number;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  tier?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  tourId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tourTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  specialRequests?: string;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsIn(BOOKING_STATUSES as unknown as string[])
  status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  notes?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceQuotedUSD?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tourTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  travelDate?: string;
}
