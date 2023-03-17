export class BaseResponseDto{
    constructor(
        public isSuccess: boolean,
        public errorMessage: string
    ){}
}