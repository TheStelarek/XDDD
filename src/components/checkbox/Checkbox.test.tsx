import { fireEvent, render } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
	test('Display checkbox ', () => {
		const { getByLabelText } = render(<Checkbox label="text" />);
		expect(getByLabelText('text')).toBeInTheDocument();
	});
	test('test change state ', () => {
		const handleChange = jest.fn();

		const { getByLabelText } = render(<Checkbox label="text" onChange={handleChange} />);
		fireEvent.click(getByLabelText('text'));
		expect(handleChange).toHaveBeenCalledTimes(1);
	});
});
