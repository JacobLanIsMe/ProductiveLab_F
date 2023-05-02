export class BaseCustomerInfoDto{
    constructor(
        public customerId: string,
        public customerSqlId: number,
        public customerName: string,
        public birthday: Date
    ){}
}