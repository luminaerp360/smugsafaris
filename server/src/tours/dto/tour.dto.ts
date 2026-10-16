import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  tagline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  duration?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationDays?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destinations?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(60)
  style?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  tier?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceUSD?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  originalPriceUSD?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  bestSeller?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(6000)
  overview?: string;
}

export class UpdateTourDto {
  @IsOptional()
  @IsString()
  @MaxLength(160)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  tagline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  duration?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  durationDays?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destinations?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(60)
  style?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  tier?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceUSD?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  originalPriceUSD?: number;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  bestSeller?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(6000)
  overview?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  heroImage?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  video?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bestMonths?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  maxGroupSize?: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  physicalRating?: string;
}
