export class ObservationNotePhotoDto{
    constructor(
        public observationNotePhotoId: string,
        public photoName:string,
        public isMainPhoto: boolean,
        public imageBase64String: string
    ){}
}