import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ForbiddenException } from '@nestjs/common';
import { UserService } from '../../service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    /**
     * GET /user
     * 
     * Fetch user for the reqest user
     * 
     * @param req 
     * @returns 
     */
    @Get()
    find(@Request() req: any) {
        try {
            const userId = req?.user?.id

            return this.userService.find(userId);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * PATCH /user/:uid
     * 
     * Update the user when user signin success, this is to sync user with cognito
     * 
     * @param req 
     * @param uid User to be updated
     */
    @Patch(':uid')
    update(@Request() req: any, @Param('uid') uid: string, @Body() body: any) {
        try {
            const userId = req?.user?.id
            // User can only update itself
            if (userId !== uid) throw new ForbiddenException();

            return this.userService.update(uid, body);
        } catch (error) {
            throw new Error(error);
        }
    }
}
