import { render } from 'tests';
import Logo from './Logo';

describe('Logo', () => {
	test('display a logo', async () => {
		const { getByText } = render(<Logo />);

		expect(getByText('join.tsh.io')).toBeInTheDocument();
	});
});
