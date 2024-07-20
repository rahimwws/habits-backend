import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Requests } from 'src/requests/entities/requests.entities';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial, In, Like, Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Requests)
    private requestsRepository: Repository<Requests>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getFriends(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      return user.friends;
    }
    return [];
  }
  async getOneFriend(username: string, friend: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with name ${username} not found`);
    }
    const isFriend = user.friends.includes(friend);

    if (isFriend) {
      const friendUser = await this.usersRepository.findOne({
        where: { username: friend },
      });

      if (friendUser) {
        const { password, email, id, friends, awards, ...friendData } =
          friendUser;
        return friendData;
      }
    }
    throw new NotFoundException(`Friend with name ${friend} not found`);
  }
  async getAllFriends(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with name ${username} not found`);
    }

    const friends = await this.usersRepository.findBy({
      username: In(user.friends),
    });
    return friends.map(({ password, email, id, ...friendData }) => friendData);
  }

  async searchFriends(username: string, text: string) {
    const users = await this.usersRepository.find({
      where: { username: Like(`%${text}%`) },
    });

    return users;
  }

  async sendFriendRequest(username: string, friendUsername: string) {
    let request = await this.requestsRepository.findOne({
      where: { username, category: 'friendship' },
    });
    if (!request) {
      request = this.requestsRepository.create({
        username,
        category: 'friendship',
        requests: [],
      });
    }
    request.requests.push(friendUsername);
    return this.requestsRepository.save(request);
  }

  async getRequests(username: string) {
    const requests = await this.requestsRepository.find({
      where: { requests: Like(`%${username}%`), category: 'friendship' },
    });
    return requests.map((request) => request.username);
  }
  async acceptFriendRequest(username: string, friendUsername: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    const friendUser = await this.usersRepository.findOne({
      where: { username: friendUsername },
    });
    if (user && friendUser && !user.friends.includes(friendUsername)) {
      user.friends.push(friendUsername);
      friendUser.friends.push(username);
      await this.usersRepository.save(user);
      await this.usersRepository.save(friendUser);
      await this.removeFriendRequest(username, friendUsername);
    }

    return { message: `User ${friendUsername} is your new friend` };
  }

  async rejectFriendRequest(username: string, friendUsername: string) {
    await this.removeFriendRequest(username, friendUsername);
  }
  async removeFriend(username: string, friendUsername: string) {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user) {
      user.friends = user.friends.filter((friend) => friend !== friendUsername);
      await this.usersRepository.save(user);
    }

    const friendUser = await this.usersRepository.findOne({
      where: { username: friendUsername },
    });

    if (friendUser) {
      friendUser.friends = friendUser.friends.filter(
        (friend) => friend !== username,
      );
      await this.usersRepository.save(friendUser);
    }
  }

  private async removeFriendRequest(username: string, friendUsername: string) {
    const requests = await this.requestsRepository.find({
      where: [
        {
          username,
          requests: Like(`%${friendUsername}%`),
          category: 'friendship',
        },
        {
          username: friendUsername,
          requests: Like(`%${username}%`),
          category: 'friendship',
        },
      ],
    });

    for (const request of requests) {
      request.requests = request.requests.filter(
        (req) => req !== username && req !== friendUsername,
      );

      if (request.requests.length === 0) {
        await this.requestsRepository.remove(request);
      } else {
        await this.requestsRepository.save(request);
      }
    }
  }
}
