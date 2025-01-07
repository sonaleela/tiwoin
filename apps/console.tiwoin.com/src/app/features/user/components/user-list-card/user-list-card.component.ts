import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
    selector: 'sonaleela-user-list-card',
    templateUrl: './user-list-card.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UserListCardComponent {
    readonly userList = input<any[]>([]);
    readonly currentUser = input<any>();
    displayedColumns = ['role', 'phoneNumber', 'status', 'actions'];

    readonly delete = output<string>();
}
