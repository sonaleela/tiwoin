import { Subject } from "rxjs";

export interface DynamicField {
    data: any;
    valueChange: Subject<any>;
}
