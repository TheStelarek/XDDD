import React from 'react';
import { ReactComponent as Mark } from '../../assets/icons/Mark.svg';
import RModal from 'react-modal';
import styles from './Modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	handleClose?: () => void;
}

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(26, 27, 29, 0.9)',
	},
};

const Modal: React.FC<ModalProps> = ({ children, handleClose, isOpen }) => {
	return (
		<RModal className={styles.modal} style={customStyles} isOpen={isOpen} onRequestClose={handleClose}>
			<button role="Close" className={styles.closeBtn} onClick={handleClose}>
				<Mark />
			</button>
			{children}
		</RModal>
	);
};

export default Modal;
