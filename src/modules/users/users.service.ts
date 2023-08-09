import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersEntity, Users } from './schema/users.schema';
import {
  InformationUsersEntity,
  InformationUsers,
} from './schema/information_users.schema';
import { CreateUsersDto, CreateStudentDto } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';
import { RoleConfigEntity, UsersRole } from '@modules/auth/schema/role.schema';
import { BaseResponse } from '@interface/base.response';
import { generatePassword } from '@utils/functions/passwordGenerator';
import config from '@config';
import { sendEmail, sendEmailValidate } from '@config/mail';
import {
  UpdateUserDto,
  ChangePassWordUserDto,
  UpdateStudentDto,
} from './dto/update-users.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersEntity.name) private usersModel: Model<Users>,
    @InjectModel(InformationUsersEntity.name)
    private informationUsersModel: Model<InformationUsers>,
    @InjectModel(RoleConfigEntity.name)
    private usersRoleModel: Model<UsersRole>,
  ) {}

  async createSuperAdmin(createUserDto: CreateUsersDto): Promise<BaseResponse> {
    try {
      // Check quyền
      const checkRole = await this.usersRoleModel.findOne({
        name: createUserDto.role,
      });
      if (!checkRole) {
        throw new Error('Role already exists');
      }
      const createdInformation = new this.informationUsersModel({
        ...createUserDto.information,
      });
      await createdInformation.save(); // Lưu thông tin người dùng trước
      // Tạo user
      const hashPwd = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.usersModel({
        userName: createUserDto.userName,
        password: hashPwd,
        information: createdInformation._id,
        role: checkRole._id,
        isActive: true,
        isDelete: false,
        isValidate: true,
      });

      const savedUser = await createdUser.save();
      return new BaseResponse(
        'Create User Super-Admin successfully',
        { savedUser },
        201,
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
  async createStudent(dto: CreateStudentDto): Promise<BaseResponse> {
    try {
      // checkUser
      const checkUser = await this.usersModel.findOne({
        userName: dto.userName,
      });
      if (checkUser) {
        throw new Error('Account already exists');
      }
      // Check quyền từ env xem db có lưu hay không
      const checkRole = await this.usersRoleModel.findOne({
        name: config.student,
      });
      if (!checkRole) {
        throw new Error('Database no have this role');
      }
      let isDuplicate = false;
      // Tạo mã học viên mới và kiểm tra sự trùng lặp
      const generateCode = async (newCode?: string): Promise<string> => {
        const codeToCheck = newCode || generatePassword();
        const existingUser = await this.informationUsersModel.findOne({
          code: codeToCheck,
        });
        isDuplicate = !!existingUser;

        if (isDuplicate) {
          return generateCode(); // Nếu mã trùng lặp, gọi lại hàm đệ quy để tạo mã mới
        }

        return codeToCheck;
      };
      // Tạo mã mới và kiểm tra tính duy nhất
      const code = await generateCode();
      // Tạo thông tin người dùng
      const information = dto.information;
      information.code = code;
      // check các thông tin người dùng
      if (
        !information.email ||
        !information.name ||
        !information.phone ||
        !information.identificationNumber
      ) {
        throw new Error('UserInfor must have email');
      }
      const informationUser = new this.informationUsersModel(information);
      await informationUser.save();

      // tự động tạo password
      const randomPassword = generatePassword();
      // Tạo user
      const hashPwd = await bcrypt.hash(randomPassword, 10);
      const createdUser = new this.usersModel({
        userName: dto.userName,
        password: hashPwd,
        information: informationUser._id,
        role: checkRole._id,
        isActive: true,
        isDelete: false,
        isValidate: true,
      });
      const savedUser = await createdUser.save();
      // Gửi email tới student
      sendEmail(information.email, dto.userName, randomPassword)
        .then(() => {
          console.log('Email sent successfully');
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
        });
      return new BaseResponse(
        'Create Student successfully',
        {
          userName: dto.userName,
          password: randomPassword,
        },
        201,
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async changeStudentPassword(
    dto: ChangePassWordUserDto,
  ): Promise<BaseResponse> {
    try {
      // check repassword
      if (dto.password !== dto.repassword) {
        throw new Error('passwords and repassword entered do not match');
      }
      // checkUser
      const checkUser = await this.usersModel
        .findOne({
          userName: dto.userName,
        })
        .populate('information')
        .populate('role');
      if (!checkUser) {
        throw new Error('Account exists in Systems');
      }
      const { information, role } = checkUser;

      // Tạo user
      console.log(dto.password, 'dto.password');
      const hashPwd = await bcrypt.hash(dto.password, 10);
      console.log(hashPwd, 'hashPwd');
      if (!information.email) {
        throw new Error('User dont have email');
      }
      const savedUser = await this.usersModel.updateOne(
        { _id: checkUser._id },
        { password: hashPwd, isValidate: true },
      );
      // Gửi email tới student
      sendEmailValidate(information.email, dto.userName, dto.password)
        .then(() => {
          console.log('Email sent successfully');
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
        });
      return new BaseResponse(
        'Validate Student successfully',
        {
          userName: dto.userName,
          password: dto.password,
        },
        201,
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
