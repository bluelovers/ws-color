import chroma from '../';

test(`pink.darken.saturate`, () =>
{

	let actual = chroma('pink').darken().saturate(2);

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

test(`rand`, () =>
{

	let actual = chroma().rand();

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	console.dir(actual)
	expect(actual).toBeTruthy();

});

describe(`rand by other input value`, () =>
{
	test(`red`, () =>
	{
		let actual = chroma.random('red');

		console.dir(actual.hex())
		expect(actual).toBeTruthy();

	});

	test(`#0F0`, () =>
	{
		let actual = chroma.random('#0F0');

		console.dir(actual.hex())
		expect(actual).toBeTruthy();

	});

	test(`color`, () =>
	{
		let actual = chroma.random(chroma('blue'));

		console.dir(actual.hex())
		expect(actual).toBeTruthy();

	});

	test(`array`, () =>
	{
		let actual = chroma.random([5, 100, 200]);

		console.dir(actual.hex())
		expect(actual).toBeTruthy();

	});

})

test(`empty`, () =>
{

	let actual = chroma();

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);

	expect(actual.toString()).toMatchSnapshot();
	expect(actual).toMatchSnapshot();

});

test(`name check`, () =>
{

	['_default', '_empty']
		.forEach(color =>
		{

			expect(chroma(color).named())
				.not
				.toStrictEqual(color)
			;

		})
	;

	expect(chroma('transparent').named())
		.toStrictEqual('transparent')
	;

});
