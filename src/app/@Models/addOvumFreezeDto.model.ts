export class AddOvumFreezeDto{
    constructor(
        public ovumDetailId: string[],
        public freezeTime: Date,
        public embryologist: string,
        public storageUnitId: number,
        public mediumInUseId: string,
        public otherMediumName: string,
        public ovumMorphology_A: number,
        public ovumMorphology_B: number,
        public ovumMorphology_C: number,
        public memo: string,
        public topColorId: number
    ){}
}