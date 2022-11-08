/**
 * Created by user on 2020/6/17.
 */
export declare function cssColors(): string[];
export type ICliColor = "cyan" | "magenta" | "blue" | "yellow" | "green" | "red";
export declare function cliColors(): ICliColor[];
export interface IOptions<T = string, R = T> {
	rand?: ((index?: number, length?: number, ...argv: any[]) => number) | boolean;
	limit?: number | -1;
	generator?(colors: readonly T[], position: number, idx: number, len: number): R;
}
export declare function loopColors<T, R = T>(colors: T[] | readonly T[], options?: IOptions<T, R>): (startIndex?: number) => Generator<R, void, unknown>;

export {
	loopColors as default,
};

export {};
