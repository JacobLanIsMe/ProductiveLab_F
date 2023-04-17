export class MainPageDto{
    constructor(
        public courseOfTreatmentSqlId: number,
        public courseOfTreatmentId: string,
        public treatmentDay: string,
        public surgicalTime: Date,
        public medicalRecordNumber: number,
        public name: string,
        public doctor: string,
        public treatmentName: string,
        public treatmentStatus: string,
        public ovumFromCourseOfTreatmentId:string,
        public spermFromCourseOfTreatmentId:string
        ){}
}