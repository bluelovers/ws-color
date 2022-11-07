import { loopColors, cliColors } from '../src/index';

test(`recall will always get startIndex color`, () =>
{

	let colors = cliColors();
	let fn = loopColors(colors)
	let startIndex = 3;

	let actual;
	let expected = colors[startIndex];

	for (let i = 0; i < 10; i++)
	{
		actual = fn(startIndex).next().value;
		console.log(i, actual)
		expect(actual).toStrictEqual(expected);
	}

});

test(`default will loop`, () =>
{

	let colors = cliColors();
	let fn = loopColors(colors)()

	let actual;

	for (let i = 0; i < 10; i++)
	{
		actual = fn.next().value;
		console.log(i, actual)
		expect(colors.includes(actual)).toStrictEqual(true);
	}

});

test(`random`, () =>
{

	let colors = cliColors();
	let fn = loopColors(colors, {
		rand: true,
	})()

	let actual;
	let i;
	let bool;

	for (i = 0; i < colors.length; i++)
	{
		actual = fn.next().value;
		console.log(i, actual)
		if (actual !== colors[i])
		{
			bool = actual !== colors[i]
			break;
		}
	}

	expect(bool).toStrictEqual(true)

});

test(`random never return undefined`, () =>
{

	let colors = cliColors();
	let fn = loopColors(colors, {
		rand: true,
	})()

	let actual;
	let i;
	let bool;

	for (i = 0; i < 100; i++)
	{
		actual = fn.next().value;
		expect(actual).not.toBeUndefined()
	}

});

test(`limit 3`, () =>
{

	let colors = cliColors();
	let fn = loopColors(colors, {
		limit: 3,
	})()

	let actual;

	for (let i = 0; i < 10; i++)
	{
		actual = fn.next().value;
		console.log(i, actual)

		if (i > 2)
		{
			expect(actual).toBeUndefined()
		}
		else
		{
			expect(i).toBeLessThanOrEqual(2)
			expect(colors.includes(actual)).toStrictEqual(true);
		}
	}

});
