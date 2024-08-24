import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvancePaymentDto } from './create-advance-payment.dto';

export class UpdateAdvancePaymentDto extends PartialType(CreateAdvancePaymentDto) {}
