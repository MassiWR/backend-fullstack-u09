import UsersDao from "../daos/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import usersDao from "../daos/users.dao";

class UsersService implements CRUD {
  async create(resource: CreateUserDto): Promise<any> {
    return UsersDao.addUser(resource);
  }

  async deleteById(id: string): Promise<any> {
    return UsersDao.removeUserById(id);
  }

  async list(limit: number, page: number): Promise<any> {
    return UsersDao.getUsers(limit, page);
  }

  async patchById(id: string, resource: PatchUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async readById(id: string): Promise<any> {
    return UsersDao.getUserById(id);
  }

  async putById(id: string, resource: PutUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async getUserByEmail(email: string): Promise<any> {
    return UsersDao.getUserByEmail(email);
  }

  async getUserByEmailWithPassword(email: string) {
    return usersDao.getUserByEmailWithPassword(email);
  }

  async createUserSchedule(id: string, timezone: any, schedule: any) {
    return usersDao.createUserSchedule(id, timezone, schedule);
  }
  async getUserSchedule(id: string) {
    return usersDao.getUserSchedule(id);
  }
}

export default new UsersService();
