// ported from jQuery's $.type
/**
 * 類型對應表 - 將 JavaScript 內建類型名稱映射為小寫字串
 * Type mapping table - maps JavaScript built-in type names to lowercase strings
 *
 * 從 Object.prototype.toString.call() 的結果中提取類型名稱
 * Extracts type name from Object.prototype.toString.call() result
 */
const classToType: IClassToTypes = {} as any;

for (let name of ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null'])
{
	classToType[`[object ${name}]`] = name.toLowerCase();
}

export type IClassToType = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'undefined' | 'null' | 'object'

/**
 * 類型對應介面 - 定義各類型的回傳型別
 * Type mapping interface - defines return types for each type
 */
export interface IClassToTypes
{
	/** 布林值 / Boolean value */
	boolean: boolean,
	/** 數字 / Number value */
	number: number,
	/** 字串 / String value */
	string: string,
	/** 函式 / Function */
	function: Function,
	/** 陣列 / Array */
	array: Array<any>,
	/** 日期 / Date object */
	date: Date,
	/** 正規表達式 / Regular expression */
	regExp: RegExp,
	/** 未定義 / Undefined */
	undefined: undefined,
	/** 空值 / Null */
	null: null,
	/** 物件 / Object */
	object: object,
}

/**
 * @deprecated
 *
 * 取得物件的 JavaScript 類型字串
 * Get JavaScript type string of an object
 *
 * 使用 Object.prototype.toString.call() 取得精確類型名稱
 * Uses Object.prototype.toString.call() to get precise type name
 *
 * @param obj - 要檢測的物件 / Object to check
 * @returns 類型名稱（小寫）/ Type name (lowercase)
 */
export function typeofTarget<T extends IClassToType>(obj): IClassToType
{
	/**
	 * 透過 classToType 查詢表取得類型，若無匹配則回傳 "object"
	 * Lookup type from classToType table, default to "object" if not found
	 */
	return classToType[Object.prototype.toString.call(obj)] || "object";
}

export default typeofTarget;
