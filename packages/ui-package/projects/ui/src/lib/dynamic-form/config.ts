import { InjectionToken } from "@angular/core";
import { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import { Observable } from "rxjs";

export interface StorageServiceInterface {
    uploadFile: (Key: string, Body: File, progressCb?: Function) => Observable<CompleteMultipartUploadCommandOutput>
}

export const StorageService = new InjectionToken<StorageServiceInterface>('storage service');
