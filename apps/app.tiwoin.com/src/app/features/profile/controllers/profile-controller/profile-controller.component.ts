import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRootStore from "@store";
import * as fromStore from "../../store";
import { EmployeeModel } from '@models';

@Component({
    selector: 'tiwoin-profile-controller',
    templateUrl: './profile-controller.component.html',
    styles: [`:host { @apply block h-full overflow-auto;}`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileControllerComponent {
    private store: Store = inject(Store);
    employee$ = this.store.select(fromRootStore.selectEmployeeProfile);
    isPending$ = this.store.select(fromRootStore.selectIsEmployeeProfilePending);
    error$ = this.store.select(fromRootStore.selectEmployeeProfileError);

    isForm$ = this.store.select(fromStore.selectIsProfileForm);
    isContactForm$ = this.store.select(fromStore.selectIsContactForm);
    isProfilePhotoForm$ = this.store.select(fromStore.selectIsProfilePhotoForm);

    isUpdatePending$ = this.store.select(fromStore.selectIsUpdateProfilePending);
    updateProfileError$ = this.store.select(fromStore.selectUpdateProfileError);

    isProfilePhotoPending$ = this.store.select(fromStore.selectIsProfilePhotoPending);
    profilePhotoError$ = this.store.select(fromStore.selectProfilePhotoError);

    submitForm(profile: Partial<EmployeeModel>) {
        this.store.dispatch(fromStore.UpdateEmployeeProfileBegin({ profile }))
    }

    uploadProfilePhoto(file: File) {
        this.store.dispatch(fromStore.UploadProfilePhotoBegin({ file }));
    }

    toggleForm(isForm: boolean) {
        this.store.dispatch(fromStore.ToggleUpdateEmployeeForm({ isForm }))
    }

    toggleContactForm(isForm: boolean) {
        this.store.dispatch(fromStore.ToggleEmployeeContactForm({ isForm }))
    }

    togglePhotoForm(isForm: boolean) {
        this.store.dispatch(fromStore.ToggleProfilePhotoForm({ isForm }));
    }

    back() {
        this.store.dispatch(fromRootStore.Back());
    }
}
