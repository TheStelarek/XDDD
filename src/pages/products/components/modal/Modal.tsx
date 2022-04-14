import Modal from '../../../../components/modal/Modal';
import styles from './Modal.module.scss';

interface ModalProps {
	handleCloseModal: () => void;
	isOpen: boolean;
	image: string;
	name: React.ReactNode;
	description: React.ReactNode;
}

const RModal: React.FC<ModalProps> = ({ isOpen, handleCloseModal, image, name, description }) => {
	return (
		<Modal handleClose={handleCloseModal} isOpen={isOpen}>
			<img src={image} className={styles.modalImage} />
			<div className={styles.productInfo}>
				<h1 className={styles.productName}>{name}</h1>
				<span className={styles.productDescription}>{description}</span>
			</div>
		</Modal>
	);
};

export default RModal;
