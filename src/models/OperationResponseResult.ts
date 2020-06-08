import { OperationResponse } from "./OperationResponse";

export class OperationResponseResult<T> extends OperationResponse {

    constructor(result: T){
        super(true, '');
        this.result = result;
    }

    result: T;
}