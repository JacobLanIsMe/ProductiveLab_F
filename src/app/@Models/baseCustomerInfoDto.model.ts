export class BaseCustomerInfoDto{
    constructor(
        public customerSqlId: number,
        public customerName: string,
        public birthday: Date
    ){}
}