import '../io/rgb';
declare const blend: {
    (bottom: any, top: any, mode: any): any;
    normal: (bottom: any, top: any) => import("../Color").Color;
    multiply: (bottom: any, top: any) => import("../Color").Color;
    screen: (bottom: any, top: any) => import("../Color").Color;
    overlay: (bottom: any, top: any) => import("../Color").Color;
    darken: (bottom: any, top: any) => import("../Color").Color;
    lighten: (bottom: any, top: any) => import("../Color").Color;
    dodge: (bottom: any, top: any) => import("../Color").Color;
    burn: (bottom: any, top: any) => import("../Color").Color;
};
declare module '../chroma' {
    interface chroma {
        blend: typeof blend;
    }
}
export default blend;
