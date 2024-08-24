import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdvancePaymentService } from '../../service/advance-payment/advance-payment.service';
import { CreateAdvancePaymentDto } from './dto/create-advance-payment.dto';
import { UpdateAdvancePaymentDto } from './dto/update-advance-payment.dto';
import { CanAccess, RoleGuard } from 'src/guards';

@UseGuards(RoleGuard)
@Controller('advance-payment')
export class AdvancePaymentController {
    constructor(private readonly advancePaymentService: AdvancePaymentService) { }

    /**
     * 
     * 
     * @param payload
     * @returns 
     */
    @Post(':employeeId')
    @CanAccess({ role: ['admin', 'owner'], apiName: 'FormListData' })
    create(@Param('employeeId') employeeId: string, @Body() payload: CreateAdvancePaymentDto) {
        try {
            return this.advancePaymentService.create(employeeId, payload);
        } catch (error) {
            throw new Error(error);
        }
    }

    @Get()
    findAll() {
        return this.advancePaymentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.advancePaymentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAdvancePaymentDto: UpdateAdvancePaymentDto) {
        return this.advancePaymentService.update(+id, updateAdvancePaymentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.advancePaymentService.remove(+id);
    }
}
