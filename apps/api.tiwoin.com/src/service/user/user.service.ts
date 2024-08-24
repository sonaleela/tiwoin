import { Injectable } from '@nestjs/common';
import { EmployeeDbService, OrganizationDBService, UserDbService } from '../../data-layer';
import { UpdateUserDto } from '../../resources/user/dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        private userService: UserDbService,
    ) { }

    /**
     * Update user by id
     * 
     * @param payload 
     * @returns 
     */
    update(id: string, payload: any) {
        return this.userService.update(id, payload);
    }

    /**
     * Fetch user profile for given id
     * 
     * @param id
     */
    find(id: string) {
        return this.userService.getUserById(id);
    }
}
