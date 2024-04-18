import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private artists = [
    {
      "id": 1,
      "name": "Barnabé Del Rio",
      "stageName": "Barna",
      "email": "barna@gmail.com",
      "profile": "PARTNER"
    },
    {
      "id": 3,
      "name": "Santiago El Santi",
      "stageName": "Tiago",
      "email": "tiago@gmail.com",
      "profile": "ARTIST"
    },
    {
      "id": 2,
      "name": "Jules Legrand",
      "stageName": "Ju",
      "email": "ju@yahoo.com",
      "profile": "BROADCASTER"
    },
  ];

  create(createArtistDto: CreateArtistDto) {
    const usersByHighestId = [...this.artists].sort((a1, a2) => a2.id - a1.id);
    const newArtist = {
      id: usersByHighestId[0].id+1,
      ...createArtistDto,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    this.artists.sort((a1, a2) => a1.id - a2.id)
    return this.artists;
  }

  findOne(id: number) {
    const user = this.artists.find((artist) => artist.id === id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    let newArtist;
    this.artists = this.artists.map((artist) => {
      if (artist.id === id) {
        newArtist = {
          ...artist,
          ...updateArtistDto,
        };
        return newArtist;
      }
      return artist;
    })
    return newArtist;
  }

  remove(id: number) {
    const toRemove = this.findOne(id);
    if (!toRemove) {
      throw new NotFoundException('User Not Found');
    }
    this.artists = this.artists.filter((artist) => artist.id !== id);
    return toRemove;
  }
}
