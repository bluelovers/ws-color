import chroma from '../';

test(`pink.darken.saturate`, () =>
{

	let actual = chroma('pink').darken().saturate(2);

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

