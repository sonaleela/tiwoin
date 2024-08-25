import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private httpClient: HttpClient) { }

    /**
     * Get form data
     * 
     * @param organizationId 
     * @param filter 
     * @returns 
     */
    getFormData(organizationId: string, filter: any) {
        const params = new HttpParams({ fromObject: { ...filter } });

        return this.httpClient.get(`/data/form/${organizationId}`, { params });
    }

    /**
     * Approve Form Data
     * 
     * @param id 
     * @param payload 
     */
    approveFormData(id: string, payload: any) {
        return this.httpClient.patch(`/data/form/${id}`, payload);
    }

    /**
     * Get work item data
     * 
     * @param organizationId 
     * @param filter 
     * @returns 
     */
    getWorkItemData(organizationId: string, filter: any = {}) {
        const params = new HttpParams({ fromObject: { ...filter } });

        return this.httpClient.get<{ data: any[], total: number }>(`/data/work-item/${organizationId}`, { params });
    }

    /**
     * Get work-item data record id
     * 
     * @param id 
     * @returns 
     */
    getWorkItemDataById(id: string) {
        return this.httpClient.get(`/data/work-item/record/${id}`);
    }

    /**
     * Update work-item Data
     * 
     * @param id 
     * @param payload 
     */
    updateWorkItemData(id: string, payload: any) {
        return this.httpClient.patch(`/data/work-item/record/${id}`, payload);
    }

    /**
     * Approve work-item Data
     * 
     * @param id 
     * @param payload 
     */
    approveWorkItemData(id: string, payload: any) {
        return this.httpClient.patch(`/data/work-item/${id}`, payload);
    }

    /**
     * Get timesheet data
     * 
     * @param organizationId 
     * @param filter 
     * @returns 
     */
    getTimesheetData(organizationId: string, filter: any) {
        const params = new HttpParams({ fromObject: { ...filter } })

        return this.httpClient.get(`/data/timesheet/${organizationId}`, { params });
    }

    /**
     * Get timesheet data record id
     * 
     * @param id 
     * @returns 
     */
    getTimesheetDataById(id: string) {
        return this.httpClient.get(`/data/timesheet/record/${id}`);
    }

    /**
     * Add timesheet data
     * 
     * @param organizationId 
     * @param data 
     * @returns 
     */
    addTimesheetData(organizationId: string, data: any) {
        return this.httpClient.post(`/data/timesheet/${organizationId}`, data);
    }

    /**
     * Update timesheet data
     * 
     * @param id 
     * @param body 
     * @returns 
     */
    updateTimesheetData(id: string, body: any) {
        return this.httpClient.patch(`/data/timesheet/record/${id}`, body);
    }

    /**
     * Get payroll data
     * 
     * @param filter 
     * @returns 
     */
    getPayrollData(filter: any) {
        return this.httpClient.get('/data/payroll');
    }

    /**
     * Get advance payment list data
     * 
     * @param organizationId 
     * @param filter 
     * @returns 
     */
    getAdvancePaymentList(organizationId: string, filter: any) {
        const params = new HttpParams({ fromObject: { ...filter } });

        return this.httpClient.get<any>(`/data/advance-payment/${organizationId}`, { params });
    }

    /**
     * Add advance payment
     * 
     * @param employeeId 
     * @param body 
     * @returns 
     */
    addAdvancePayment(employeeId: string, body: any) {
        return this.httpClient.post(`/advance-payment/${employeeId}`, body);
    }
}
