import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectCategory } from '../../shared';
import { CreateProjectDto, UpdateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectsService implements OnModuleInit {
  constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) {}

  async onModuleInit() {
    const count = await this.projectModel.countDocuments();
    if (count > 0) return;

    await this.projectModel.insertMany([
      {
        title: 'YCDO Health Program',
        category: ProjectCategory.HEALTHCARE,
        description: 'Free & subsidized medical care through 16+ hospitals across Multan',
        impactStat: '50,000+ patients served annually',
        location: 'Multan',
      },
      {
        title: 'Scholarship Program',
        category: ProjectCategory.EDUCATION,
        description: 'Financial support for brilliant but needy students at school, college and university',
        impactStat: '500+ scholarships awarded',
        location: 'Pakistan',
      },
      {
        title: 'Food & Kitchen Services',
        category: ProjectCategory.FOOD,
        description: 'Daily nutritious meals for food-insecure families and individuals',
        impactStat: '5,000+ meals served monthly',
        location: 'Multan',
      },
      {
        title: 'Water Filtration (RO Plants)',
        category: ProjectCategory.WATER,
        description: 'Clean drinking water through RO filtration plants, handpumps in rural areas',
        impactStat: '20+ filtration plants installed',
        location: 'Pakistan',
      },
      {
        title: 'Orphan Care Program',
        category: ProjectCategory.ORPHAN,
        description: 'Comprehensive welfare support for orphaned children across Pakistan',
        impactStat: '200+ orphans supported',
        location: 'Pakistan',
      },
      {
        title: 'Community Welfare Services',
        category: ProjectCategory.COMMUNITY,
        description: 'Winter packages, Ramadan food, Qurbani, Shadi boxes, Wheelchair distribution',
        impactStat: '10,000+ families benefited',
        location: 'Pakistan',
      },
    ]);
  }

  findAll(category?: string) {
    const filter = category ? { category } : {};
    return this.projectModel.find(filter).sort({ order: 1, createdAt: -1 });
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  create(dto: CreateProjectDto) {
    return this.projectModel.create(dto);
  }

  async update(id: string, dto: UpdateProjectDto) {
    const project = await this.projectModel.findByIdAndUpdate(id, dto, { new: true });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async remove(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project) throw new NotFoundException('Project not found');
    return { message: 'Project deleted' };
  }
}
