import { fireEvent, render, within } from '@testing-library/react';

import Modal from 'components/modal/Modal';
import ReactModal from 'react-modal';

ReactModal.setAppElement(document.createElement('div'));

describe('Modal', () => {
	test('can be display and close', () => {
		const handleClose = jest.fn();

		const { getByRole } = render(<Modal isOpen={true} handleClose={handleClose} />);

		expect(getByRole('dialog')).toBeInTheDocument();
		fireEvent.click(within(getByRole('dialog')).getByRole('Close'));

		expect(handleClose).toHaveBeenCalledTimes(1);
	});
});
