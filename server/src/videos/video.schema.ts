import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema({ timestamps: true })
export class Video {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: 'Maasai Mara National Reserve, Kenya', trim: true })
  location: string;

  @Prop({ default: 'Kenya', trim: true })
  country: string;

  @Prop({ default: 'Maasai Mara', index: true })
  destinationTag: string;

  @Prop({ required: true, trim: true })
  videoSrc: string;

  @Prop({ default: '', trim: true })
  poster: string;

  @Prop({ default: '0:30' })
  duration: string;

  @Prop({ default: 'HD 1080p' })
  resolution: string;

  @Prop({ default: 'savannah-ambient' })
  soundType: string;

  @Prop({ default: '' })
  soundTitle: string;

  @Prop({ default: '' })
  soundDescription: string;

  @Prop({ default: '' })
  caption: string;

  @Prop({ type: [String], default: [] })
  wildlife: string[];

  @Prop({ default: '' })
  fieldNotes: string;

  @Prop({ default: false, index: true })
  featured: boolean;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

VideoSchema.index({ createdAt: -1 });
VideoSchema.index({ title: 'text', caption: 'text', location: 'text' });
