import { render } from 'tests';
import { Products } from './Products';

describe('Products', () => {
	test('Display Logo', async () => {
		const { getByText } = render(<Products />);

		expect(getByText('join.tsh.io')).toBeInTheDocument();
	});

	test('Display Input', async () => {
		const { getByPlaceholderText } = render(<Products />);

		expect(getByPlaceholderText('Search')).toBeInTheDocument();
	});
	test('Display Checkbox', async () => {
		const { getByLabelText } = render(<Products />);

		expect(getByLabelText('Promo')).toBeInTheDocument();
		expect(getByLabelText('Active')).toBeInTheDocument();
	});
});
