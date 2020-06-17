import { IScale } from './scale';
declare module '../chroma' {
    interface chroma {
        cubehelix: typeof cubehelix;
    }
}
export interface ICubehelix {
    /**
     * Set start color for hue rotation, default=300
     */
    start(): number;
    start(s: number): ICubehelix;
    /**
     * number (and direction) of hue rotations (e.g. 1=360°, 1.5=`540°``), default=-1.5
     */
    rotations(): number;
    rotations(r: number): ICubehelix;
    /**
     * gamma factor can be used to emphasise low or high intensity values, default=1
     */
    gamma(): number;
    gamma(g: number): ICubehelix;
    /**
     * lightness range: default: [0,1] (black -> white)
     */
    lightness(): number;
    lightness(l: number[]): ICubehelix;
    /**
     * You can call cubehelix.scale() to use the cube-helix through the chroma.scale interface.
     */
    scale(): IScale;
    hue(): number;
    hue(hue: number | [number, number]): ICubehelix;
}
declare function cubehelix(start?: number, rotations?: number, hue?: number | [number, number], gamma?: number, lightness?: number | number[]): ICubehelix;
export default cubehelix;
