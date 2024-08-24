import { Module } from '@nestjs/common';
import { OrganizationUserController } from './organization-user.controller';

@Module({
  controllers: [OrganizationUserController],
  providers: []
})
export class OrganizationUserModule { }
