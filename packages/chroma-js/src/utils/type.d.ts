export declare type IClassToType = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'undefined' | 'null' | 'object';
export interface IClassToTypes {
    boolean: boolean;
    number: number;
    string: string;
    function: Function;
    array: Array<any>;
    date: Date;
    regExp: RegExp;
    undefined: undefined;
    null: null;
    object: object;
}
/**
 * @deprecated
 */
export declare function typeofTarget<T extends IClassToType>(obj: any): IClassToType;
export default typeofTarget;
