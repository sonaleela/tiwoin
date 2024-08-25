import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sonaleela-user-list-card',
    templateUrl: './user-list-card.component.html',
    styles: [`:host { @apply block; }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListCardComponent {
    @Input() userList: any[] = [];
    @Input() currentUser: any;
    displayedColumns = ['role', 'phoneNumber', 'status', 'actions'];

    @Output() delete = new EventEmitter<string>();
}
