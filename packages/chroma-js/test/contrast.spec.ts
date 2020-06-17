import { chroma } from '../';
import { _contrast000 } from '../src/utils/contrast/util';

describe(`contrastFront`, () =>
{

	[
		['#906', '#ffffff'],
		['#66F', '#000000'],
		['#800', '#ffffff'],
		['#C60', '#000000'],
		['#EAEA00', '#000000'],
		['#006', '#ffffff'],
		['#360', '#ffffff'],
	].forEach(color => {

		test(color[0], () =>
		{
			let c = chroma(color[0])

			let actual = c.contrastFront();
			let expected = color[1];

			let d = _contrast000(c.rgba())

			console.log(c.hex(), actual.hex(), d)

			console.log(c.named(), actual.named())

			expect(actual.hex()).toStrictEqual(expected)
			expect([c.hex(), actual.hex(), d]).toMatchSnapshot();

		});

	})

})
