/**
 * Created by user on 2020/6/17.
 */
export declare function cssColors(): string[];
export type ICliColor = "cyan" | "magenta" | "blue" | "yellow" | "green" | "red";
export declare function cliColors(): ICliColor[];
export declare function loopColors<T>(colors: T[] | readonly T[], options?: {
    rand?: ((index?: number, length?: number, ...argv: any[]) => number) | boolean;
    limit?: number | -1;
}): (startIndex?: number) => Generator<T, void, unknown>;
export default loopColors;
