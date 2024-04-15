import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role == role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((u1, u2) => u2.id - u1.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
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
