/**
 * Created by user on 2020/6/18.
 */

export function isNumber(n, fn?): n is number
{
	return typeof n === 'number' && !isNaN(n)
}
