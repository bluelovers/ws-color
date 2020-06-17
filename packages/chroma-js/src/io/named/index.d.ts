import { IColorSpaces } from '../../types';
declare module '../../Color' {
    interface Color {
        name(): string;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        named(name: string): IColorSpaces["rgba"];
    }
}
