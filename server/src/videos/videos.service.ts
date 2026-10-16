import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './video.schema';
import { CreateVideoDto, UpdateVideoDto } from './dto/video.dto';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  async findAll(query?: { destinationTag?: string; featured?: string; search?: string }) {
    const filter: any = {};
    if (query?.destinationTag && query.destinationTag !== 'all') {
      filter.destinationTag = query.destinationTag;
    }
    if (query?.featured !== undefined) {
      filter.featured = query.featured === 'true';
    }
    if (query?.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { location: { $regex: query.search, $options: 'i' } },
        { caption: { $regex: query.search, $options: 'i' } },
      ];
    }
    return this.videoModel.find(filter).sort({ createdAt: -1 }).lean();
  }

  async findOne(id: string) {
    const video = await this.videoModel.findOne({ id }).lean();
    if (!video) throw new NotFoundException(`Video "${id}" not found`);
    return video;
  }

  async create(dto: CreateVideoDto) {
    const id = dto.id?.trim() || `vid-${slugify(dto.title)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const created = await this.videoModel.create({
      ...dto,
      id,
    });
    return created.toObject();
  }

  async update(id: string, dto: UpdateVideoDto) {
    const updated = await this.videoModel
      .findOneAndUpdate({ id }, { $set: dto }, { new: true })
      .lean();
    if (!updated) throw new NotFoundException(`Video "${id}" not found`);
    return updated;
  }

  async remove(id: string) {
    const res = await this.videoModel.deleteOne({ id });
    if (!res.deletedCount) throw new NotFoundException(`Video "${id}" not found`);
    return { ok: true, deleted: id };
  }
}
