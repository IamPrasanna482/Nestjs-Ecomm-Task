import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Req, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, GetUserParamsDto } from "./dto/user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async findAll(
    @Req() req: Request, // req contains the jwt token
    @Query() params: GetUserParamsDto, // params contains the query parameters for filtering
  ) {
    // get the authorization token from authorization header
    const authorization = (req.headers as any).authorization;  // a string
    const token = authorization.split(' ')[1];
// const token = 'asdfasf';
    // check if token is present or not
    if (!token) {
      // only admin can access /users GET
      throw new HttpException(
        'Auth token is missing !',
        HttpStatus.BAD_REQUEST,
      );
    }

    // get the boolean value to check if the requested user can get access this URL, call canGetAccess function from userServices file
    const canAccessURL = await this.UserService.canGetAccess(token);

    // if access denied i.e. the role is not admin
    if (!canAccessURL) {
      return new UnauthorizedException(
        'Only admin can access /users GET endpoint!',
        'Unauthorized',
      );
    }

    // if role is admin, call the getAllUsers function from the userService file to get all the users
    return this.UserService.getAllUsers(params);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.UserService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.UserService.deleteUser(userId);
  }
}