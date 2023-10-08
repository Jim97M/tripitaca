import { Body, Controller, HttpStatus, Post, Req, Res, Delete, Param} from "@nestjs/common";
import { User } from "../models/user.schema";
import { UserService } from "../service/user.service";
import { JwtService } from "../service/jwt.service";

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
    const newUser = await this.userService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUser
    });
  }

  @Post('/signin')
  async SignIn(@Res() response, @Body() user: User) {
    const token = await this.userService.signin(user);
    return response.status(HttpStatus.OK).json(token);
  }

  @Delete('/signout/:token')
  async Logout(@Param('token') token: string, @Res() response) {
    try {
      await this.userService.logout(token);
      return response.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
