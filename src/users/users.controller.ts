import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // /users/ -> ALL users
  findAllUsers() {
    return { users: 'ALL' };
  }
  
  @Get('artists') // /artists
  findAllArtists() {
    return { artists: 'ALL' };
  }
  
  @Get('artists/:id') // /artists/:id
  findOneArtist(@Param('id') id: string) {
    return { id: +id, artists: 'ALL' };
  }

  // ... 
  
  @Get(':id') // /users/:id
  findOneUser(@Param('id') id: string) {
    return { userId: +id };
  }
}
