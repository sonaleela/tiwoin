import { Injectable } from '@nestjs/common';
import { SiteDbService } from '../../data-layer';
import { CreateSiteDto } from '../../resources/site/dto/create-site.dto';
import { UpdateSiteDto } from '../../resources/site/dto/update-site.dto';

@Injectable()
export class SiteService {
  constructor(private siteSerivce: SiteDbService) { }

  create(userId: string, createSiteDto: CreateSiteDto) {
    return this.siteSerivce.createSite(userId, createSiteDto);
  }

  findOne(id: string) {
    return this.siteSerivce.getSiteById(id);
  }

  update(id: string, updateSiteDto: UpdateSiteDto) {
    return this.siteSerivce.updateSite(id, updateSiteDto);
  }

  remove(id: string) {
    return this.siteSerivce.deleteById(id);
  }

  getListByOrganizationId(organizationId: string) {
    return this.siteSerivce.getListByOrganizationId(organizationId)
  }
}
