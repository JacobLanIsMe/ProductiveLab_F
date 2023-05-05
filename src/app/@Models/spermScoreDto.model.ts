export class SpermScoreDto{
    constructor(
        public volume: number,
        public concentration: number,
        public activityA: number,
        public activityB: number,
        public activityC: number,
        public activityD: number,
        public spermScoreTimePointId: number,
        public spermScoreTimePoint: string,
        public recordTime: Date,
        public embryologist: string,
        public embryologistName: string,
        public courseOfTreatmentId: string,
        public courseOfTreatmentSqlId: number,
        public morphology?: number,
        public abstinence?: number,
        
        

        

    ){}
}