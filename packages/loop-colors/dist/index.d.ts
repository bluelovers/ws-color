import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

export declare function cssColors(): readonly [
	"#906",
	"#66F",
	"#800",
	"#C60",
	"#EAEA00",
	"#006",
	"#360"
];
export type ICliColor = "cyan" | "magenta" | "blue" | "yellow" | "green" | "red";
export declare function cliColors(): ICliColor[];
export interface IOptions<T = string, R = T> {
	rand?: ((index?: number, length?: number, ...argv: any[]) => number) | boolean;
	limit?: number | -1;
	generator?(colors: readonly T[], position: number, idx: number, len: number): R;
}
export declare function loopColors<T, R = T>(colors: ITSArrayListMaybeReadonly<T>, options?: IOptions<T, R>): (startIndex?: number) => Generator<R, undefined, R>;

export {
	loopColors as default,
};

export {};
