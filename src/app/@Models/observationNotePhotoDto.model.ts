export class ObservationNotePhotoDto{
    constructor(
        public observationNotePhotoId: string,
        public route:string,
        public isMainPhoto: boolean,
        public imageBase64String: string
    ){}
}