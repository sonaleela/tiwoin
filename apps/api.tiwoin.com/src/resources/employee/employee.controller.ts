import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards } from '@nestjs/common';
import { EmployeeService } from '../../service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { RoleGuard, CanAccess } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    /**
     * POST /employee
     * Create a new employee
     * 
     * @param req 
     * @param createEmployeeDto 
     * @returns 
     */
    @Post()
    @CanAccess({ role: ['admin', 'owner'], apiName: 'CreateEmployee' })
    async create(@Request() req: any, @Body() createEmployeeDto: CreateEmployeeDto) {
        try {
            const userId = req?.user?.id;
            return await this.employeeService.create(userId, createEmployeeDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /employee?organization=:organization
     * List of employee by organization id
     * 
     * @param organizationId 
     * @returns 
     */
    @Get()
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'EmployeeList' })
    async findAll(@Request() req: any, @Query('organizationId') organizationId: string, @Query('searchString') searchString: string) {
        try {
            return await this.employeeService.getEmployees({organizationId, searchString});
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * GET /employee/:id
     * Fetch employee by id
     * 
     * @param id 
     * @returns 
     */
    @Get(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'GetEmployee' })
    async findOne(@Param('id') id: string) {
        try {
            return await this.employeeService.findOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    @Get('/:id/document')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'ListDocuments' })
    listDocument(@Request() req: any, @Param('id') employeeId: string) {
        try {
            return this.employeeService.findDocumentList(employeeId);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Request a document to employee
     * 
     * @param req 
     * @param id Employee id
     * @param createDocumentDTO 
     * @returns
     */
    @Post('/:id/document')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'RequestDocument' })
    requestDocument(@Request() req: any, @Param('id') employeeId: string, @Body() createDocumentDTO: any) {
        try {
            const requestUserId = req?.user?.id;

            return this.employeeService.requestDocument(employeeId, requestUserId, createDocumentDTO);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Update doument by submitting file
     * 
     * @param documentBody 
     * @param documentId 
     * @returns 
     */
    @Patch('document/:documentId')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'UpdateDocument' })
    updateDocument(@Body() documentBody: any, @Param('documentId') documentId: string) {
        try {
            return this.employeeService.updateDocument(documentId, documentBody);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * PATCH /employee/:id
     * Update employee by id
     * 
     * @param id 
     * @param updateEmployeeDto 
     * @returns 
     */
    @Patch(':id')
    @CanAccess({ role: ['admin', 'owner', 'employee'], apiName: 'UpdateEmployee' })
    async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        try {
            return await this.employeeService.update(id, updateEmployeeDto);
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * DELETE /employee/:id
     * Delete employee
     * 
     * @param id employee id
     * @returns 
     */
    @Delete(':id')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'DeleteEmployee' })
    remove(@Param('id') id: string) {
        try {
            return this.employeeService.remove(id);
        } catch (error) {
            throw new Error(error);
        }
    }
}
