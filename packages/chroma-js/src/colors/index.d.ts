/**
 * Created by user on 2020/6/17.
 */
export interface IColorNames {
    transparent: [null, null, null, 0];
    _default: string;
}
declare module '../chroma' {
    interface chroma {
        colors: IColorNames;
    }
}
declare const colors: IColorNames;
export default colors;
