declare function valid(...args: any[]): boolean;
declare module '../chroma' {
    interface chroma {
        valid: typeof valid;
    }
}
export default valid;
