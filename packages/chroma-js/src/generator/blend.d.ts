import '../io/rgb';
import Color from '../Color';
export declare type IBlendMode = 'multiply' | 'darken' | 'lighten' | 'screen' | 'overlay' | 'burn' | 'dodge';
/**
 * Blends two colors using RGB channel-wise blend functions.
 */
export declare function blend(bottom: string | Color, top: string | Color, mode: IBlendMode): Color;
export declare namespace blend {
    var normal: (bottom: string | Color, top: string | Color) => Color;
    var multiply: (bottom: string | Color, top: string | Color) => Color;
    var screen: (bottom: string | Color, top: string | Color) => Color;
    var overlay: (bottom: string | Color, top: string | Color) => Color;
    var darken: (bottom: string | Color, top: string | Color) => Color;
    var lighten: (bottom: string | Color, top: string | Color) => Color;
    var dodge: (bottom: string | Color, top: string | Color) => Color;
    var burn: (bottom: string | Color, top: string | Color) => Color;
}
export interface blend extends Record<IBlendMode, (bottom: string | Color, top: string | Color) => Color> {
}
declare module '../chroma' {
    interface chroma {
        /**
         * Blends two colors using RGB channel-wise blend functions.
         */
        blend: typeof blend;
    }
}
export default blend;
