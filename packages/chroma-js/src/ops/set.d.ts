declare module '../Color' {
    interface Color {
        set<T>(mc: string, value: string | number, mutate?: boolean): T;
    }
}
export {};
