import { Injectable } from '@nestjs/common';
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { FormDbService } from '../../data-layer';
import { CreateFormDto } from '../../resources/form/dto/create-form.dto';
import { UpdateFormDto } from '../../resources/form/dto/update-form.dto';

@Injectable()
export class FormService {
    constructor(private formService: FormDbService) { }

    create(userId: string, createFormDto: CreateFormDto) {
        return this.formService.createForm(userId, createFormDto);
    }

    getListByOrganizationId(organizationId: string) {
        return this.formService.getListByOrganizationId(organizationId)
    }

    findOne(id: string) {
        return this.formService.getFormById(id);
    }

    update(id: string, updateFormDto: UpdateFormDto) {
        return this.formService.UpdateForm(id, updateFormDto);
    }

    remove(id: string) {
        return this.formService.deleteById(id);
    }

    async getSubmissionListByUserId(organizationId: string, filter: any = {}) {
        let response = await this.formService.getSubmissionListByUserId(organizationId, filter);
        // response = {
        //     data: response.data.map(form => {
        //         console.log(form.fields);
        //         if ((<any[]>form?.fields).some(field => field.type === 'FILE')) {
        //             const fields = form?.fields?.map((field: any) => {
        //                 if (field.type !== 'FILE') return field;
        //                 const value = field?.value?.map((v: any) => {
        //                     const client = new S3Client();
        //                     const command = new GetObjectCommand({ Bucket: '', Key: '' });
        //                     const url = await getSignedUrl(client, command, { expiresIn: 3600 });
        //                     return { ...v, }
        //                 });
        //                 return {
        //                     ...field,
        //                     value,
        //                 };
        //             });
        //             return { ...form, fields };
        //         }
        //         return form;
        //     }),
        // };
        return response;
    }

    submitForm(employeeId: string, body: any) {
        return this.formService.submitForm(employeeId, body);
    }
}
