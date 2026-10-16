import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destination, DestinationDocument } from './destination.schema';
import { CreateDestinationDto, UpdateDestinationDto } from './dto/destination.dto';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name) private readonly destinationModel: Model<DestinationDocument>,
  ) {}

  async findAll() {
    return this.destinationModel.find().sort({ name: 1 }).lean();
  }

  async findOne(id: string) {
    const destination = await this.destinationModel.findOne({ id }).lean();
    if (!destination) throw new NotFoundException('Destination not found');
    return destination;
  }

  async create(dto: CreateDestinationDto) {
    let id = slugify(dto.name);
    const exists = await this.destinationModel.exists({ id });
    if (exists) id = `${id}-${Date.now().toString().slice(-5)}`;
    return this.destinationModel.create({ ...dto, id });
  }

  async update(id: string, dto: UpdateDestinationDto) {
    const destination = await this.destinationModel
      .findOneAndUpdate({ id }, { $set: dto }, { new: true, runValidators: true })
      .lean();
    if (!destination) throw new NotFoundException('Destination not found');
    return destination;
  }

  async remove(id: string) {
    const result = await this.destinationModel.deleteOne({ id });
    if (!result.deletedCount) throw new NotFoundException('Destination not found');
    return { success: true };
  }
}
