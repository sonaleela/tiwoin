import { ForbiddenException, Injectable } from '@nestjs/common';
import { EmployeeDbService, OrganizationUserDbService, UserDbService } from '../../data-layer';
import { CreateEmployeeDto } from '../../resources/employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../resources/employee/dto/update-employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        private employeeService: EmployeeDbService,
        private userService: UserDbService,
        private organizationUserService: OrganizationUserDbService,
    ) { }

    /**
     * Create employee
     * 
     * @param userId 
     * @param createEmployeeDto 
     * @returns 
     */
    async create(userId: string, createEmployeeDto: CreateEmployeeDto) {
        const { phoneNumber, organizationId } = createEmployeeDto;

        if (!organizationId) throw new ForbiddenException("Cannot add employee without organization");

        // Check if employee with phoneNumber already exists
        const existingEmployee = await this.employeeService.getEmployeeByPhoneNumberAndOrganization(phoneNumber, organizationId);
        if (existingEmployee) throw new ForbiddenException("Employee with same phone number already exists!");

        // Check if any user exist with same phone number
        const user: any = await this.userService.getUserByPhone(phoneNumber);
        // Add userId to employee
        const employee = await this.employeeService.createEmployee(userId, { ...createEmployeeDto, userId: user?.id });

        let organizationUser = await this.organizationUserService.getOrganizationUserList({ userId: user?.id, phoneNumber, organizationId });
        // if organization user already exist that means the phone number/user is already invited to organization
        // then just update it with employeeId
        if (organizationUser?.data.length) {
            await this.organizationUserService.updateOrganizationUser(organizationUser.data[0].id, { employeeId: employee.id, isEmployee: true });
            return employee;
        }

        // If user exist in organization then invite it by user.id
        // If user does not exist then invite non existing user to organization with phone number
        let organizationUserPayload = {};
        if (user) {
            organizationUserPayload = {
                userId: user.id,
                organizationId,
                role: 'Employee',
                employeeId: employee.id,
                isEmployee: true,
            };
        } else {
            organizationUserPayload = {
                phoneNumber,
                organizationId,
                role: 'Employee',
                employeeId: employee.id,
                isEmployee: true,
            };
        }
        await this.userService.createOrganizationUser(organizationUserPayload, false);

        return employee;
    }

    findOne(id: string) {
        return this.employeeService.getEmployeeById(id);
    }

    update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeeService.updateEmployee(id, updateEmployeeDto);
    }

    async remove(employeeId: string) {
        // Fetch and delete corresponding organziation user
        const organizationUser = await this.organizationUserService.getOrganizationUserList({ employeeId });
        if (organizationUser.data?.length) await this.organizationUserService.deleteOrganizationUser(organizationUser.data[0].id);

        return this.employeeService.deleteById(employeeId);
    }

    getListByOrganizationId(organizationId: string) {
        return this.employeeService.getListByOrganizationId(organizationId)
    }

    getEmployees(filter: any) {
        return this.employeeService.getEmployees(filter)
    }

    getEmployeeByOrganizationAndUserId(organizationId: string, userId: string) {
        return this.employeeService.getEmployeeByOrganizationAndUserId(organizationId, userId);
    }

    async requestDocument(employeeId: string, requestUserId: string, createDocumentDTO: any) {
        return this.employeeService.requestDocument(employeeId, requestUserId, createDocumentDTO);
    }

    /**
     * Get list of documents for employeeId
     * 
     * @param employeeId 
     */
    async findDocumentList(employeeId: string) {
        return this.employeeService.getDocumentListByEmployeeId(employeeId);
    }

    /**
     * Update doucment body
     * 
     * @param documentId 
     * @param documentBody 
     */
    updateDocument(documentId: string, documentBody: any) {
        return this.employeeService.updateDocument(documentId, documentBody);
    }
}
