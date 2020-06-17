import '../ops/luminance';
declare function contrast(a: any, b: any): number;
declare module '../chroma' {
    interface chroma {
        contrast: typeof contrast;
    }
}
export default contrast;
