import { ICubehelix } from '../types';
declare module '../chroma' {
    interface chroma {
        cubehelix: typeof cubehelix;
    }
}
declare function cubehelix(start?: number, rotations?: number, hue?: number | [number, number], gamma?: number, lightness?: number | number[]): ICubehelix;
export default cubehelix;
