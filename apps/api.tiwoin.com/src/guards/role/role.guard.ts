import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { OrganizationUserService } from 'src/service';

export const CanAccess = Reflector.createDecorator<{ role: string[], apiName: string, byPassGuard?: boolean }>();

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private organizationUserService: OrganizationUserService,
    ) { }

    async canActivate(context: ExecutionContext,): Promise<boolean> {
        const canAccess = this.reflector.get(CanAccess, context.getHandler());
        if (canAccess.byPassGuard) return true;

        const request = context.switchToHttp().getRequest();
        const user = request?.user;
        const organizationId = request.headers['organization-id'] || request.query['organizationId'] || request.params['organizationId'] || request.body['organizationId'];

        // Allow admin to access all
        if (user.type === 'Admin') return true;

        // UpdateOrganizationUser
        if (canAccess?.apiName === 'UpdateOrganizationUser' && !organizationId && request.params['organizationUserId']) {
            const organizationUser = await this.organizationUserService.getOrganizationUserById(request.params['organizationUserId']);
            return organizationUser?.phoneNumber === request?.user?.phoneNumber;
        }

        const organizationUser = await this.organizationUserService
            .getOrganizationUser({ userId: user.id, organizationId });
        const role: string = organizationUser?.role || '';
        if (canAccess?.role.map(r => r.toLowerCase()).includes(role.toLowerCase())) return true;

        return false;
    }
}
