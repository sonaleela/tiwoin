import { Controller, Get, Request, Post, Body, Patch, Param, Delete, Query, ForbiddenException, UseGuards } from '@nestjs/common';
import { OrganizationUserService } from '../../service';
import { CreateOrganizationUserDto } from './dto/create-organization-user.dto';
import { UpdateOrganizationUserDto } from './dto/update-organization-user.dto';
import { CanAccess, RoleGuard } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('organization-user')
export class OrganizationUserController {
    constructor(
        private readonly organizationUserService: OrganizationUserService,
    ) { }

    /**
     * POST /
     * 
     * Invite new user to organization with role set
     */
    @Post()
    @CanAccess({ role: ['admin', 'owner'], apiName: 'InviteUser' })
    async inviteUser(@Request() req: any, @Body() body: any) {
        try {
            const invitedBy = req?.user?.id;
            return await this.organizationUserService.createOrganizationUser({ ...body, invitedBy });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET ?organizationId=:organizationId
     * 
     * Get a list of all(accepted/pending) invitation for an organzation
     */
    @Get()
    @CanAccess({ role: ['admin', 'owner'], apiName: 'ListOrganizationUsers' })
    async getUsers(@Request() req: any, @Query('organizationId') organizationId: string) {
        try {
            return this.organizationUserService.getUsers(organizationId);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * List of organizations for req user.
     * 
     * List all the organization-user records with organization, roles etc populated
     */
    @Get('/organizations')
    @CanAccess({ role: [], apiName: 'ListOrganizationsForUser', byPassGuard: true })
    async getOrganizationsList(@Request() req: any, @Query() filter: any) {
        try {
            const requestUserId = req?.user?.id;
            return this.organizationUserService.getOrganizationsList({ userId: requestUserId, ...filter });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /organization/:organizationId/users/:organization-user
     * 
     * Fetech one user of the organization by organization-user id
     * This is a used for updating user invitation like roles etc.
     */
    @Get(':organizationUserId')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetOrganizationUser' })
    async getUser(@Request() req: any, @Param('organizationUserId') organizationUserId: string) {
        try {
            return await this.organizationUserService.fetchOrganizationUserById(organizationUserId);
        } catch (error) {
            throw new ForbiddenException(error.message, { cause: error });
        }
    }

    /**
     * 
     * Update user invitation by accepting or rejecting it
     */
    @Patch(':organizationUserId')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'UpdateOrganizationUser' })
    async updateUser(@Request() req: any, @Param('organizationUserId') organizationUserId: string, @Body() body: any) {
        try {
            // If user is accepting/rejecting then  update their userId to organization-user record
            // else it's admin who is editing the invitation record.
            if (typeof body?.isAccepted === 'boolean') {
                const userId = req?.user?.id;
                return this.organizationUserService.updateOrganizationUserById(organizationUserId, { ...body, userId });
            } else {
                const updatedBy = req?.user?.id;
                return this.organizationUserService.updateOrganizationUserById(organizationUserId, { ...body, updatedBy });
            }
        } catch (error) {
            throw new Error(error);
        }
    }


    /**
     * Delete organizationUserId
     * 
     * delete organization-user
     */
    @Delete(':organizationUserId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'DeleteOrganizationUser' })
    async deleteUser(@Request() req: any, @Param('organizationUserId') organizationUserId: string, @Body() body: any) {
        try {
            return await this.organizationUserService.deleteOrganizationUserById(organizationUserId);
        } catch (error) {
            throw new ForbiddenException(error.message, { cause: error });
        }
    }
}
