export class MainPageDto{
    constructor(
        public courseOfTreatmentId: number,
        public treatmentDay: string,
        public surgicalTime: Date,
        public medicalRecordNumber: number,
        public name: string,
        public doctor: string,
        public treatmentName: string,
        public treatmentStatus: string){}
}