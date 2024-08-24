import { Injectable } from '@nestjs/common';
import { CreateAdvancePaymentDto } from '../../resources/advance-payment/dto/create-advance-payment.dto';
import { UpdateAdvancePaymentDto } from '../../resources/advance-payment/dto/update-advance-payment.dto';
import { AdvancePaymentDbService } from 'src/data-layer/advance-payment-db/advance-payment-db.service';

@Injectable()
export class AdvancePaymentService {
    constructor(private advancePaymentService: AdvancePaymentDbService) { }

    /**
     * Create a advance payment record 
     * 
     * @param employeeId: string
     * @param payload
     * @returns 
     */
    create(employeeId: string, payload: CreateAdvancePaymentDto) {
        this.advancePaymentService.create(employeeId, payload);
    }

    findAll() {
        return `This action returns all advancePayment`;
    }

    findOne(id: number) {
        return `This action returns a #${id} advancePayment`;
    }

    update(id: number, updateAdvancePaymentDto: UpdateAdvancePaymentDto) {
        return `This action updates a #${id} advancePayment`;
    }

    remove(id: number) {
        return `This action removes a #${id} advancePayment`;
    }
}
