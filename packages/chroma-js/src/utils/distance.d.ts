declare function distance(a: any, b: any, mode?: string): number;
declare module '../chroma' {
    interface chroma {
        distance: typeof distance;
    }
}
export default distance;
