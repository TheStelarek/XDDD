import React from 'react';
import styles from './Modal.module.scss';
import RModal from 'react-modal';
import { ReactComponent as Mark } from '../../assets/icons/Mark.svg';

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
			<button className={styles.closeBtn} onClick={handleClose}>
				<Mark />
			</button>
			{children}
		</RModal>
	);
};

export default Modal;
