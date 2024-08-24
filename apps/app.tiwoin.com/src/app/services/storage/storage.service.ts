import { Injectable } from '@angular/core';
import { S3Client } from "@aws-sdk/client-s3";
import { exhaustMap, map } from 'rxjs/operators';
import { Progress, Upload } from '@aws-sdk/lib-storage';
import { from } from 'rxjs';
import { StorageServiceInterface } from "@sonaleela/ui";

import { AuthenticationService } from "../authentication/authentication.service";

// TODO: extract S3Client in a memoized cache clousure
@Injectable({
    providedIn: 'root'
})
export class StorageService implements StorageServiceInterface {
    constructor(private authenticationService: AuthenticationService) { }

    uploadFile(Key: string, Body: File, progressCb?: Function) {
        const Bucket = 'tiwoin-user-uploads';
        return this.authenticationService.getCredentials()
            .pipe(map(credentials => new S3Client({ credentials, region: 'ap-south-1' })),
                exhaustMap(s3Client => {
                    return this.upload({ s3Client, Bucket, Key, Body }, progressCb);
                }),
            );
    }

    private upload(config: { s3Client: S3Client, Bucket: string, Key: string, Body: File }, progressCb?: Function) {
        const { s3Client, Bucket, Key, Body } = config;
        const upload = new Upload({
            client: s3Client,
            params: { Bucket, Key, Body: Body },
        });

        // If progress call back provided, run it
        if (progressCb) {
            upload.on('httpUploadProgress', (progress: Progress) => {
                progressCb(progress);
            });
        }

        return from(upload.done());
    }


}
