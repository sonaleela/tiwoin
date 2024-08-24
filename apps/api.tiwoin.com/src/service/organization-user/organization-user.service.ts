import { Injectable } from '@nestjs/common';
import { EmployeeDbService, OrganizationUserDbService, UserDbService } from 'src/data-layer';

@Injectable()
export class OrganizationUserService {
    constructor(
        private organizationUserService: OrganizationUserDbService,
        private userService: UserDbService,
        private employeeService: EmployeeDbService,
    ) { }

    /**
    * Find list of organizations for a user
    * We need to fetch the phoneNumber for the userId since the organization-user might not have userId
    * 
    * @param filter 
    */
    async getOrganizationUser(filter: { userId: string, organizationId: string }) {
        if (!filter.userId || !filter.organizationId) return;
        return this.organizationUserService.getOrganizationUser({ ...filter });
    }

    /**
     * Find list of organizations for a user
     * We need to fetch the phoneNumber for the userId since the organization-user might not have userId
     * 
     * @param filter 
     */
    async getOrganizationsList(filter: { employeeId?: string, phoneNumber?: string, userId: string, organizationId?: string, isAccepted?: boolean }) {
        const user = await this.userService.getUserById(filter.userId);
        if (!user) return;

        return this.organizationUserService.getOrganizationUserList({ phoneNumber: user.phoneNumber, ...filter });
    }

    /**
     * Invite a new user to an organization along with roles
     */
    async createOrganizationUser(request: { invitedBy: string, phoneNumber: string, organizationId: string, role: string }) {
        // Check if user is inviting itself
        const invitedByUser = await this.userService.getUserById(request.invitedBy);
        if (invitedByUser?.phoneNumber === request.phoneNumber) throw new Error('You can not invite yourself');

        // Check if the same phone number is already invited
        const existingOrganizationUser = await this.userService
            .getUserByPhoneNumberAndOrganizationId(request.phoneNumber, request.organizationId);
        if (existingOrganizationUser) throw new Error('A user with phone number is already added to the organization');

        // User with the same phone number
        const user = await this.userService.getUserByPhone(request.phoneNumber);
        // Check if an employee exist with same number then this invitation is for that user
        // TODO: remove this part since emloyee will be automatically invited
        // If somehow we need to reinivte it'll contain employeeId
        // const employee = await this.employeeService.getEmployeeByPhoneNumber(request.phoneNumber);

        return this.userService.createOrganizationUser({ ...request, userId: user?.id });
    }

    /**
     * Fetch single organization user by id
     */
    fetchOrganizationUserById(id: string) {
        return this.organizationUserService.getOrganizationUserById(id);
    }

    /**
     * Get all organization-users for given organization
     * @param organizationId 
     */
    getUsers(organizationId: string) {
        return this.organizationUserService.getOrganizationUserList({ organizationId });
    }

    /**
     * Fetch single organization user by id
     */
    async updateOrganizationUserById(id: string, body: any) {
        const organizationUser = await this.organizationUserService.getOrganizationUserById(id);
        // If organization user has employeeId but the employee object doesn't have userId
        // than the employee was inited before signup and now it wants to accept the organization
        if (organizationUser?.employeeId && body?.userId) {
            const employee = await this.employeeService.getEmployeeById(organizationUser?.employeeId);
            if (!employee?.userId) await this.employeeService.updateEmployee(organizationUser?.employeeId, { userId: body?.userId });
        }
        return this.organizationUserService.updateOrganizationUser(id, body);
    }

    /**
     * Get single organization user by id
     */
    getOrganizationUserById(id: string) {
        return this.organizationUserService.getOrganizationUserById(id);
    }

    /**
     * delete organization user by id
     */
    deleteOrganizationUserById(id: string) {
        return this.organizationUserService.deleteOrganizationUser(id);
    }
}
