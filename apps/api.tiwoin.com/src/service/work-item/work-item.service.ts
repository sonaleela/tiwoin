import { Injectable } from '@nestjs/common';
import { WorkItemDbService } from '../../data-layer';
import { CreateWorkItemDto } from '../../resources/work-item/dto/create-work-item.dto';
import { UpdateWorkItemDto } from '../../resources/work-item/dto/update-work-item.dto';

@Injectable()
export class WorkItemService {
    constructor(private workItemService: WorkItemDbService) { }

    /**
     * Create work-item
     * @param userId 
     * @param createWorkItemDto 
     */
    create(userId: string, createWorkItemDto: CreateWorkItemDto) {
        return this.workItemService.createWorkItem(userId, createWorkItemDto);
    }

    getListByOrganizationId(organizationId: string) {
        return this.workItemService.getListByOrganizationId(organizationId);
    }

    findOne(id: string) {
        return this.workItemService.getWorkItemById(id)
    }

    getSubmissionListByUserId(organizationId: string, filter: any = {}) {
        return this.workItemService.getSubmissionListByUserId(organizationId, filter);
    }

    update(id: string, updateWorkItemDto: UpdateWorkItemDto) {
        return this.workItemService.updateWorkItem(id, updateWorkItemDto);
    }

    remove(id: string) {
        return this.workItemService.deleteById(id);
    }

    submitWorkItem(employeeId: string, body: any) {
        return this.workItemService.submitWorkItem(employeeId, body);
    }
}
