import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../../shared';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async onModuleInit() {
    const count = await this.userModel.countDocuments();
    if (count > 0) return;

    const password = await bcrypt.hash('Admin@123', 10);
    await this.userModel.create({
      email: 'admin@ycdo.org.pk',
      password,
      name: 'Super Admin',
      role: UserRole.ADMIN,
    });
  }

  findByEmail(email: string, includePassword = false) {
    const query = this.userModel.findOne({ email });
    return includePassword ? query : query.select('-password');
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const created = await this.userModel.create({ ...dto, password: hashed });
    const { password: _password, ...safeUser } = created.toObject();
    return safeUser;
  }

  findAll() {
    return this.userModel.find().select('-password').sort({ createdAt: -1 });
  }
}
