import { render } from '@testing-library/react';
import Empty from './Empty';

describe('Empty', () => {
	test('should show empty container ', () => {
		const { getByText } = render(<Empty />);
		expect(getByText('Ooops… It’s empty here')).toBeInTheDocument();
		expect(getByText('There are no products on the list')).toBeInTheDocument();
	});
});
