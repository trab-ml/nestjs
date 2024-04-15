import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client-dto';

@Injectable()
export class ClientsService {
  private users = [
    {
      id: 1,
      name: 'Jean',
      email: 'jean22@yahoo.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Jeanne',
      email: 'jeanne24@yahoo.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Bernard',
      email: 'trab@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Bertrand',
      email: 'trand24@yahoo.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role == role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  create(createClientDto: CreateClientDto) {
    const usersByHighestId = [...this.users].sort((u1, u2) => u2.id - u1.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createClientDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateClientDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id != id);
    return removedUser;
  }
}
