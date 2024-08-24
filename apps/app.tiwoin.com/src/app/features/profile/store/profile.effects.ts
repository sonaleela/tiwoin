import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { Dialog } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { v4 as uuid } from "uuid";
import { of } from 'rxjs';

import { StorageService, EmployeeService } from '@services';
import { GeolocationEmptyDialogComponent } from '@shared';
import * as fromRootStore from "@store";
import * as fromActions from './profile.actions';
import * as fromSelectors from "./profile.selectors";

@Injectable()
export class ProfileEffects {
    documentPayload: any;
    profilePhotoName: string = '';

    /**
     * Upload document begin
     */
    uploadDocumentBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UploadDocumentBegin),
        concatLatestFrom(_ => [
            this.store.select(fromSelectors.selectDocumentRequest),
            this.store.select(fromRootStore.selectOrganization),
        ]),
        exhaustMap(([payload, documentPayload, organization]) => {
            if (!organization?.id) throw new Error("Organization is not selected!");
            if (!documentPayload) throw new Error("Document payload is not available!");
            if (!payload.file) throw new Error("No file selected to upload!");

            const fileName = `${uuid()}.${payload.file.name.split('.')?.pop()}`;
            this.documentPayload = {
                id: documentPayload?.id,
                fileName,
                size: (<File>payload.file).size,
                type: (<File>payload.file).type,
                extension: payload.file.name.split('.')?.pop(),
                name: documentPayload?.name,
                organizationId: organization?.id,
            }
            return this.storageService.uploadFile(fileName, payload.file);
        }),
        exhaustMap(response => {
            if (response?.$metadata?.httpStatusCode !== 200) throw new Error("Error in uploading file");
            return this.employeeService.updateDocument(this.documentPayload);
        }),
        mergeMap((response) => [
            fromActions.UploadDocumentSuccess({ response }),
            fromRootStore.FetchDocumentListBegin()
        ]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UploadDocumentFail({ error: error.message }));
            return caught;
        }),
    ));

    /**
     * Update employee begin
     */
    updateEmployeeProfileBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UpdateEmployeeProfileBegin),
        concatLatestFrom(_ => this.store.select(fromRootStore.selectDeviceGeoLocation)),
        mergeMap(([payload, geoLocation]) => {
            if (!geoLocation) {
                const dialogRef = this.dialog.open(GeolocationEmptyDialogComponent, {
                    data: { ...payload.profile, geoLocation: null },
                });

                return dialogRef.closed;
            } else {
                return of({ ...payload.profile, geoLocation });
            }
        }),
        exhaustMap((payload: any) => {
            return this.employeeService.updateEmployeeProfile(payload.id, payload);
        }),
        mergeMap(profile => [
            fromActions.UpdateEmployeeProfileSuccess({ profile }),
            fromRootStore.SetEmployeeProfile({ profile }),
            fromActions.ToggleUpdateEmployeeForm({ isForm: false }),
            fromActions.ToggleEmployeeContactForm({ isForm: false }),
        ]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UpdateEmployeeProfileFail({ error }));
            return caught;
        }),
    ));

    /**
     * Upload employee profile photo 
     */
    uploadProfilePhotoBegin$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.UploadProfilePhotoBegin),
        exhaustMap((payload) => {
            this.profilePhotoName = `${uuid()}.${payload.file.name.split('.')?.pop()}`;;
            return this.storageService.uploadFile(this.profilePhotoName, payload.file)
        }),
        concatLatestFrom(() => this.store.select(fromRootStore.selectEmployeeProfile)),
        exhaustMap(([response, profile]) => {
            if (response?.$metadata?.httpStatusCode !== 200) throw new Error("Error in uploading file");

            return this.employeeService.updateEmployeeProfile(profile?.id || '', { avatar: { url: this.profilePhotoName } })
        }),
        mergeMap(profile => [
            fromActions.UploadProfilePhotoSuccess(),
            fromRootStore.SetEmployeeProfile({ profile }),
        ]),
        catchError((error, caught) => {
            this.store.dispatch(fromActions.UploadProfilePhotoFail({ error }));
            return caught;
        }),
    ));

    constructor(
        private actions$: Actions,
        private storageService: StorageService,
        private store: Store,
        private employeeService: EmployeeService,
        private dialog: Dialog,
    ) { }
}
