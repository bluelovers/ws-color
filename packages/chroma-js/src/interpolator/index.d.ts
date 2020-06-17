import Color from '../Color';
export interface IInterpolator {
    [fn: string]: (col1: Color, col2: Color, f?: number) => Color;
}
export declare type IInterpolatorMode = keyof IInterpolator;
declare const _default: IInterpolator;
export default _default;
