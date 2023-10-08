import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../models/user.schema";
import * as bcrypt from 'bcrypt';
import { JwtService } from "./jwt.service";
import { TokenRevocationService } from './token-revocation.service'; // Import the TokenRevocationService


@Injectable()
export class UserService {
  private blacklistedTokens: string[] = [];

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private tokenRevocationService: TokenRevocationService, 
  ) { }

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      fullname: user.fullname,
      email: user.email,
      password: hash
    }
    const newUser = new this.userModel(reqBody);
    return newUser.save();
  }

  async signin(user: User): Promise<any> {
    const foundUser = await this.userModel.findOne({ email: user.email }).exec();
    if (foundUser) {
      const { password } = foundUser;
      if (await bcrypt.compare(user.password, password)) {
        const payload = { email: user.email };
        const token = this.jwtService.generateToken(payload);
        return {
          token,
        };
      }
      return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
    }
    return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
  }

  async getOne(email): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  // async logout(token: string): Promise<void> {
  //   // Add the token to the blacklist
  //   this.blacklistedTokens.push(token);
  // }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    // Check if the token is in the blacklist
    return this.blacklistedTokens.includes(token);
  }
  async logout(token: string): Promise<void> {
    // Check if the token is revoked
    if (this.tokenRevocationService.isTokenRevoked(token)) {
      throw new HttpException('Token has already been revoked', HttpStatus.BAD_REQUEST);
    }

    // Revoke the token and add it to the revoked tokens list
    this.tokenRevocationService.revokeToken(token);
  }
}
