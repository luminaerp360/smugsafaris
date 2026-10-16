import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tagline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  video?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bestTimeToVisit?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keyWildlife?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedTourIds?: string[];
}

export class UpdateDestinationDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tagline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  video?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bestTimeToVisit?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keyWildlife?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedTourIds?: string[];
}
