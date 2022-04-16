import { render } from 'tests';
import Spinner from './Spinner';

describe('Spinner', () => {
	test('render a Spinner', async () => {
		const { getByRole } = render(<Spinner />);

		expect(getByRole('Load')).toBeInTheDocument();
	});
});
