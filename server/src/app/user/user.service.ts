import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid'
import { GetUserDto } from './dto/get-user.dto';
import { usetToGetUserDto } from './util';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        userId: v4(),
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        passwordHash: createUserDto.password,
        photoUrl: createUserDto.photoUrl,
        email: createUserDto.email
      })
      const {passwordHash,...dbUser} = await this.userRepository.save(user)
      
      return dbUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail)
    }
  }

  async validateUser(email: string, password: string) {
    
    const dbUser = await this.findByEmail(email)
    return dbUser.passwordHash == password
  }

  async findAll() {
    return (await this.userRepository.find()).map(user => new GetUserDto(user.email,user.firstName,user.lastName,user.photoUrl));
  }

  async findById(userId: string) : Promise<GetUserDto> {
    try {
      const user = await this.userRepository.findOne(userId)
      return usetToGetUserDto(user)
    } catch (error) {
      console.log(error);
      throw new BadRequestException("User not found!")
    }
    
  }

  findByEmail(email: string) {
    try {
      return this.userRepository.findOne({ email: email })
    } catch (error) {
      throw new BadRequestException(error.detail)
    }
    
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
