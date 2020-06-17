import chroma from '..';

describe(`simple two color linear interpolation`, () =>
{

	let fn = chroma.bezier(['white', chroma('black').alpha(0)]);

	test(`starts from white`, () =>
	{

		let actual = fn(0);

		expect(actual.hex()).toStrictEqual('#ffffff');

		expect(actual).toMatchSnapshot();

	});

	test(`ends in transparent black`, () =>
	{

		let actual = fn(1);

		expect(actual.hex()).toStrictEqual('#00000000');

		expect(actual).toMatchSnapshot();

	});

	test(`center is transluscent grey`, () =>
	{

		let actual = fn(0.5);

		expect(actual.hex()).toStrictEqual('#77777780');

		expect(actual).toMatchSnapshot();

	});

})

describe(`three color quadratic bezier interpolation`, () =>
{

	let fn = chroma.bezier(['white', chroma('red').alpha(.5), chroma('black').alpha(0)]);

	test(`starts from white`, () =>
	{

		let actual = fn(0);

		expect(actual.hex()).toStrictEqual('#ffffff');

		expect(actual).toMatchSnapshot();

	});

	test(`ends in transparent black`, () =>
	{

		let actual = fn(1);

		expect(actual.hex()).toStrictEqual('#00000000');

		expect(actual).toMatchSnapshot();

	});

	test(`center is a transluscent greyish red`, () =>
	{

		let actual = fn(0.5);

		expect(actual.hex()).toStrictEqual('#c45c4480');

		expect(actual).toMatchSnapshot();

	});

})

describe(`four color cubic bezier interpolation`, () =>
{

	let fn = chroma.bezier([
		'white',
		chroma('yellow').alpha(1 / 3),
		chroma('red').alpha(2 / 3),
		chroma('black').alpha(0),
	]);

	test(`starts from white`, () =>
	{

		let actual = fn(0);

		expect(actual.hex()).toStrictEqual('#ffffff');

		expect(actual).toMatchSnapshot();

	});

	test(`ends in transparent black`, () =>
	{

		let actual = fn(1);

		expect(actual.hex()).toStrictEqual('#00000000');

		expect(actual).toMatchSnapshot();

	});

	test(`1st quarter`, () =>
	{

		let actual = fn(0.25);

		expect(actual.hex()).toStrictEqual('#ffe085a7');

		expect(actual).toMatchSnapshot();

	});

	test(`center`, () =>
	{

		let actual = fn(0.5);

		expect(actual.hex()).toStrictEqual('#e6973580');

		expect(actual).toMatchSnapshot();

	});

	test(`3rd quarter`, () =>
	{

		let actual = fn(0.75);

		expect(actual.hex()).toStrictEqual('#91421358');

		expect(actual).toMatchSnapshot();

	});

})

describe(`five color diverging quadratic bezier interpolation`, () =>
{

	let fn = chroma.bezier([
		'darkred',
		chroma('orange').alpha(.75),
		chroma('snow').alpha(.5),
		chroma('lightgreen').alpha(.25),
		chroma('royalblue').alpha(0),
	]);

	test(`starts from darkred`, () =>
	{

		let actual = fn(0);

		expect(actual.hex()).toStrictEqual('#8b0000');

		expect(actual).toMatchSnapshot();

	});

	test(`ends in transparent royalblue`, () =>
	{

		let actual = fn(1);

		expect(actual.hex()).toStrictEqual('#4169e100');

		expect(actual).toMatchSnapshot();

	});

	test(`1st quarter`, () =>
	{

		let actual = fn(0.25);

		expect(actual.hex()).toStrictEqual('#e9954ebf');

		expect(actual).toMatchSnapshot();

	});

	test(`center is snow`, () =>
	{

		let actual = fn(0.5);

		expect(actual.hex()).toStrictEqual('#fffafa80');

		expect(actual).toMatchSnapshot();

	});

	test(`3rd quarter`, () =>
	{

		let actual = fn(0.75);

		expect(actual.hex()).toStrictEqual('#a6cfc140');

		expect(actual).toMatchSnapshot();

	});

})

