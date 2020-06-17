import { IColorSpaces } from '../../types';
declare module '../../Color' {
    interface Color {
        /**
         * Returns the named color. Falls back to hexadecimal RGB string, if the color isn't present.
         */
        named(): string;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        named(name: string): IColorSpaces["rgba"];
    }
}
