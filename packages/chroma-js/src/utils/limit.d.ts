export declare function limit(x: number, min?: number, max?: number): number;
declare module '../chroma' {
    interface chroma {
        limit(x: number, min?: number, max?: number): number;
    }
}
export default limit;
