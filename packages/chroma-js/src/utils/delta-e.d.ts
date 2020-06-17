declare function deltaE(a: any, b: any, L?: number, C?: number): number;
declare module '../chroma' {
    interface chroma {
        deltaE: typeof deltaE;
    }
}
export default deltaE;
