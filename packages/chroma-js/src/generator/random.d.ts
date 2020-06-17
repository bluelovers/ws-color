import Color from '../Color';
declare module '../chroma' {
    interface chroma {
        random(): Color;
    }
}
declare const _default: () => Color;
export default _default;
