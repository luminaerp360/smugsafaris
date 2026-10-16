import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

export const BOOKING_STATUSES = [
  'new',
  'contacted',
  'quoted',
  'confirmed',
  'completed',
  'cancelled',
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, unique: true, index: true })
  reference: string;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ default: '' })
  travelDate: string;

  @Prop({ default: 2 })
  adults: number;

  @Prop({ default: 0 })
  children: number;

  @Prop({ default: 'Mid-Range Comfort' })
  tier: string;

  @Prop({ default: '' })
  tourId: string;

  @Prop({ default: '' })
  tourTitle: string;

  @Prop({ default: '' })
  specialRequests: string;

  @Prop({ default: 'website', enum: ['website', 'manual'] })
  source: string;

  @Prop({ default: 'new', enum: BOOKING_STATUSES, index: true })
  status: string;

  @Prop({ default: '' })
  notes: string;

  @Prop({ type: Number, default: null })
  priceQuotedUSD: number | null;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ fullName: 'text', email: 'text', reference: 'text', phone: 'text' });
