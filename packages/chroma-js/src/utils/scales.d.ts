import '../io/hsl';
declare const scales: {
    cool(): import("../generator/scale").IScale<import("../Color").Color>;
    hot(): import("../generator/scale").IScale<import("../Color").Color>;
};
declare module '../chroma' {
    interface chroma {
        scales: typeof scales;
    }
}
export default scales;
