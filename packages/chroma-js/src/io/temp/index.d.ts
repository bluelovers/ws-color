import Color from '../../Color';
import temperature2rgb from './temperature2rgb';
declare module '../../Color' {
    interface Color {
        /**
         * Estimate the temperature in Kelvin of any given color, though this makes the only sense for colors from the
         * [temperature gradient]{@link ChromaStatic.temperature} above.
         */
        temp(): number;
        /**
         * Estimate the temperature in Kelvin of any given color, though this makes the only sense for colors from the
         * [temperature gradient]{@link ChromaStatic.temperature} above.
         */
        kelvin(): number;
        /**
         * Estimate the temperature in Kelvin of any given color, though this makes the only sense for colors from the
         * [temperature gradient]{@link ChromaStatic.temperature} above.
         */
        temperature(): number;
    }
}
declare module '../../chroma' {
    interface chroma {
        /**
         * Returns a color from the color temperature scale.
         * light 2000K, bright sunlight 6000K.
         * Based on Neil Bartlett's implementation.
         * https://github.com/neilbartlett/color-temperature
         */
        temp(t: number): Color;
        temp(...args: any[]): Color;
        /**
         * Returns a color from the color temperature scale.
         * light 2000K, bright sunlight 6000K.
         * Based on Neil Bartlett's implementation.
         * https://github.com/neilbartlett/color-temperature
         */
        kelvin(t: number): Color;
        kelvin(...args: any[]): Color;
        /**
         * Returns a color from the color temperature scale.
         * light 2000K, bright sunlight 6000K.
         * Based on Neil Bartlett's implementation.
         * https://github.com/neilbartlett/color-temperature
         */
        temperature(t: number): Color;
        temperature(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        temp: typeof temperature2rgb;
        kelvin: typeof temperature2rgb;
        temperature: typeof temperature2rgb;
    }
}
