export class TreatmentDto{
    constructor(
        public ovumSituationName: string,
        public ovumSourceName:string,
        public ovumOperationName:string,
        public spermSituationName:string,
        public spermSourceName:string,
        public spermOperationName:string,
        public spermRetrievalMethodName:string,
        public embryoSituationName:string,
        public embryoOperationName:string,
    ){}
    
}