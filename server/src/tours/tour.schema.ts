import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TourDocument = HydratedDocument<Tour>;

@Schema({ timestamps: true, strict: false })
export class Tour {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  tagline: string;

  @Prop({ default: '' })
  duration: string;

  @Prop({ default: 1 })
  durationDays: number;

  @Prop({ type: [String], default: [] })
  destinations: string[];

  @Prop({ default: '' })
  style: string;

  @Prop({ default: 'Mid-Range Comfort' })
  tier: string;

  @Prop({ default: 0 })
  priceUSD: number;

  @Prop({ type: Number, default: null })
  originalPriceUSD: number | null;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: false })
  bestSeller: boolean;

  @Prop({ default: '' })
  heroImage: string;

  @Prop({ default: '' })
  video: string;

  @Prop({ type: [String], default: [] })
  galleryImages: string[];

  @Prop({ default: '' })
  overview: string;

  @Prop({ type: [String], default: [] })
  highlights: string[];

  @Prop({ default: 7 })
  maxGroupSize: number;

  @Prop({ default: 'Easy' })
  physicalRating: string;

  @Prop({ default: '' })
  bestMonths: string;

  @Prop({ type: [String], default: [] })
  included: string[];

  @Prop({ type: [String], default: [] })
  excluded: string[];

  @Prop({ type: [Object], default: [] })
  itinerary: any[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);
