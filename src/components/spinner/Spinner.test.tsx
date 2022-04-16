import { render } from 'tests';
import Spinner from './Spinner';

describe('Spinner', () => {
	test('Display spinner', async () => {
		const { getByRole } = render(<Spinner />);

		expect(getByRole('Load')).toBeInTheDocument();
	});
});
