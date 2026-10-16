import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DestinationDocument = HydratedDocument<Destination>;

@Schema({ timestamps: true, strict: false })
export class Destination {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  country: string;

  @Prop({ default: '' })
  tagline: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: '' })
  video: string;

  @Prop({ default: '' })
  bestTimeToVisit: string;

  @Prop({ type: [String], default: [] })
  keyWildlife: string[];

  @Prop({ type: [String], default: [] })
  highlights: string[];

  @Prop({ type: [String], default: [] })
  relatedTourIds: string[];
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
