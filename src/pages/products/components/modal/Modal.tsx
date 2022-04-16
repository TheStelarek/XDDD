import Modal from '../../../../components/modal/Modal';
import styles from './Modal.module.scss';

interface ModalProps {
	handleCloseModal: () => void;
	isOpen: boolean;
	image: string;
	name: React.ReactNode;
	description: React.ReactNode;
	alt: string;
}

const RModal: React.FC<ModalProps> = ({ isOpen, handleCloseModal, image, name, description, alt }) => {
	return (
		<Modal handleClose={handleCloseModal} isOpen={isOpen}>
			<img src={image} className={styles.modalImage} alt={alt} />
			<div className={styles.productInfo}>
				<h1 className={styles.productName}>{name}</h1>
				<span className={styles.productDescription}>{description}</span>
			</div>
		</Modal>
	);
};

export default RModal;
