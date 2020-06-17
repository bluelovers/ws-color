// ported from jQuery's $.type
const classToType: IClassToTypes = {} as any;

for (let name of ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null'])
{
	classToType[`[object ${name}]`] = name.toLowerCase();
}

export type IClassToType = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'undefined' | 'null' | 'object'
export interface IClassToTypes
{
	boolean: boolean,
	number: number,
	string: string,
	function: Function,
	array: Array<any>,
	date: Date,
	regExp: RegExp,
	undefined: undefined,
	null: null,
	object: object,
}

/**
 * @deprecated
 */
export function typeofTarget<T extends IClassToType>(obj): IClassToType
{
	return classToType[Object.prototype.toString.call(obj)] || "object";
}

export default typeofTarget;
