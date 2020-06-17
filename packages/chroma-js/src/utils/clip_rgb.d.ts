export interface IRGB extends Array<number> {
    _clipped?: boolean;
    _unclipped?: number[];
}
declare const _default: (rgb: IRGB) => IRGB;
export default _default;
