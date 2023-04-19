export class MediumDto{
    constructor(
        public mediumInUseId: string,
        public name: string,
        public openDate: Date,
        public expirationDate: Date,
        public lotNumber: string,
        public isDeleted: boolean,
        public mediumTypeId:number
    ){}
}