import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationDto, authDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { generateVerificationCode, setVerificationCode } from './utils/code';
import { Mail } from './utils/email';

@Injectable()
export class AuthService {
  private verificationCodes = new Map<
    string,
    { code: string; timer: NodeJS.Timeout; userId: number }
  >();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private mailUtil: Mail,
  ) {}

  async checkUsername(username: string) {
    const existingUserByUserName = await this.usersRepository.findOne({
      where: { username },
    });

    if (!existingUserByUserName) {
      return { message: 'Username is available' };
    } else {
      throw new UnauthorizedException('This username is already exist');
    }
  }
  async register({ email, password, name, username }: authDto) {
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email },
    });
    const existingUserByUserName = await this.usersRepository.findOne({
      where: { username },
    });
    if (existingUserByUserName || existingUserByEmail) {
      throw new UnauthorizedException('User is already registered');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.usersRepository.create({
        email,
        password: hashedPassword,
        name,
        username,
      });
      const savedUser = await this.usersRepository.save(newUser);
      const verificationCode = generateVerificationCode();
      setVerificationCode(
        email,
        verificationCode,
        this.verificationCodes,
        60000,
        savedUser.id,
        this,
      );
      // await this.mailUtil.sendMail(email, verificationCode);

      const payload = { username: savedUser.username, id: savedUser.id };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }
  }

  async login({ username, password }: authDto) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { username: user.username, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getAllUsers(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async verifyCode({ email, code }: VerificationDto) {
    const storedData = this.verificationCodes.get(email);
    if (!storedData) {
      return {
        message: 'Verification code expired. Please request a new code.',
      };
    }
    if (storedData.code === code) {
      clearTimeout(storedData.timer);
      this.verificationCodes.delete(email);
      return { message: 'Verification successful.' };
    } else {
      return { message: 'Invalid verification code.' };
    }
  }

  async deleteUserByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }
    await this.usersRepository.remove(user);
    return { message: `User '${username}' has been deleted` };
  }

  async deleteUnverifiedUser(userId: number, email: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (user) {
      await this.usersRepository.remove(user);
      this.verificationCodes.delete(email);
    }
  }
}
