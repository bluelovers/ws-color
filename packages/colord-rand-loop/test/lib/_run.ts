
import { Colord } from 'colord';

export function _generateStartToEnd(start: number, end: number, gen: Generator<Colord, void, Colord>)
{
	_generateStartToEndWithFormatter(0, end, gen, (value) => value.toRgbString());
}

export function _generateStartToEndWithFormatter(start: number, end: number, gen: Generator<Colord, void, Colord>, formatter: (value: Colord) => string)
{
	for (let i = start; i < end; i++)
	{
		const { value, done } = gen.next();
		if (done) break;
		console.log(`  [${i}] ${formatter(value as Colord)}`);
	}
}

export function _generateStartToEndForStringArray(start: number, end: number, gen: Generator<string, void, string>)
{
	for (let i = start; i < end; i++)
	{
		const { value, done } = gen.next();
		if (done) break;
		console.log(`  [${i}] ${value}`);
	}
}
