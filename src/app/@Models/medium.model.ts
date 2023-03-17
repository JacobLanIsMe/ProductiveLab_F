export class Medium{
    constructor(
        public mediumInUseId: string,
        public name: string,
        public openDate: Date,
        public expirationDate: Date,
        public lotNumber: string,
        public isDeleted: boolean
    ){}
}