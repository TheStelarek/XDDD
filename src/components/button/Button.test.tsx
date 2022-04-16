import { fireEvent, render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
	test('Button with correct text ', () => {
		const { getByText } = render(<Button> text</Button>);
		expect(getByText('text')).toBeInTheDocument();
	});
	test('Test onclick function ', () => {
		const handleChange = jest.fn();

		const { getByText } = render(<Button onClick={handleChange}> text </Button>);
		fireEvent.click(getByText('text'));
		expect(handleChange).toHaveBeenCalledTimes(1);
	});
});
