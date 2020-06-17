import { w3cx11, IW3CX11ColorNames } from 'color-palette/lib/w3cx11';
export type { IW3CX11ColorNames };
declare module '../index' {
    interface IColorNames extends IW3CX11ColorNames {
    }
}
export default w3cx11;
