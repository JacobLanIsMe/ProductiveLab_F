import { BaseCustomerInfoDto } from "./baseCustomerInfoDto.model";
import { SpermScoreDto } from "./spermScoreDto.model";

export class BaseOperateSpermInfoDto{
    constructor(
        public spermSituationName: string,
        public spermRetrievalMethodName: string,
        public spermOwner: BaseCustomerInfoDto
    ){}
}