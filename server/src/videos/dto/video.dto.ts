import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVideoDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  destinationTag?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  videoSrc: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  poster?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  duration?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  resolution?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  soundType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  soundTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  soundDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  caption?: string;

  @IsOptional()
  @IsArray()
  wildlife?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  fieldNotes?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}

export class UpdateVideoDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  destinationTag?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  videoSrc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  poster?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  duration?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  resolution?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  soundType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  soundTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  soundDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  caption?: string;

  @IsOptional()
  @IsArray()
  wildlife?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  fieldNotes?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
