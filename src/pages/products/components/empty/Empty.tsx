import { ReactComponent as EmptyIcon } from '../../../../assets/icons/Group.svg';
import styles from './Empty.module.scss';

const Empty = () => (
	<div className={styles.emptyWrapper}>
		<EmptyIcon />
		<span className={styles.upperText}>Ooops… It’s empty here</span>
		<span className={styles.lowerText}>There are no products on the list</span>
	</div>
);

export default Empty;
