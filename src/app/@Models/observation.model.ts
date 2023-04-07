export class Observation{
    constructor(
        public observationNoteId: string,
        public observationType: string,
        public day: number,
        public observationTime: Date,
        public mainPhoto: string,
        public mainPhotoBase64: string
    ){}
}