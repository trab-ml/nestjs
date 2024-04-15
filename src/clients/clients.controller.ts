import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';

@Controller('clients')
export class ClientsController {
  /*
    GET /clients
    GET /clients/:id
    POST /clients
    PATCH /clients/:id
    DELETE /clients/:id
    */

  @Get() // /clients?role
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return 'Welcome ' + role;
  }

  @Get('docs') // /clients/docs or /clients/docs?version=5
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): { id: string } {
    return { id };
  }

  @Post()
  createAlternative(@Body() user: {}) {
    return user;
  }

  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  create(): string {
    return 'Always';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
