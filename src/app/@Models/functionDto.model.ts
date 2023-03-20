export class FunctionDto{
    constructor(
        public functionId: number,
        public name: string,
        public route: string,
        public functionTypeId: number,
        public subFunctions: FunctionDto[]
    ){}
}