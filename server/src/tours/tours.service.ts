import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourDocument } from './tour.schema';
import { CreateTourDto, UpdateTourDto } from './dto/tour.dto';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private readonly tourModel: Model<TourDocument>) {}

  async findAll() {
    return this.tourModel.find().sort({ priceUSD: 1 }).lean();
  }

  async findOne(id: string) {
    const tour = await this.tourModel.findOne({ id }).lean();
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  async create(dto: CreateTourDto) {
    let id = slugify(dto.title);
    const exists = await this.tourModel.exists({ id });
    if (exists) id = `${id}-${Date.now().toString().slice(-5)}`;
    return this.tourModel.create({ ...dto, id });
  }

  async update(id: string, dto: UpdateTourDto) {
    const tour = await this.tourModel
      .findOneAndUpdate({ id }, { $set: dto }, { new: true, runValidators: true })
      .lean();
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  async remove(id: string) {
    const result = await this.tourModel.deleteOne({ id });
    if (!result.deletedCount) throw new NotFoundException('Tour not found');
    return { success: true };
  }
}
