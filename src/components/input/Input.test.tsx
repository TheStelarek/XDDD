import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import Input from './Input';

const Component = () => {
	const [value, setValue] = useState('');
	return <Input id="text" placeholder="text" onChange={(e) => setValue(e.target.value)} value={value} />;
};

describe('Input', () => {
	test('Display input ', () => {
		const { getByPlaceholderText } = render(<Component />);
		expect(getByPlaceholderText('text')).toBeInTheDocument();
	});

	test('test onChange event ', () => {
		const { getByPlaceholderText } = render(<Component />);
		const nameInput = getByPlaceholderText('text') as HTMLInputElement;
		fireEvent.change(nameInput, { target: { value: 'test' } });
		expect(nameInput.value).toBe('test');
	});
});
