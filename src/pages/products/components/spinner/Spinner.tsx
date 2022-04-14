import React from 'react';
import styles from './Spinner.module.scss';
import Spinner from '../../../../components/spinner/Spinner';
import { ReactComponent as Empty } from '../../../../assets/icons/Group.svg';

interface ISpinner {
	isLoading: boolean;
}

const RSpinner: React.FC<ISpinner> = ({ isLoading }) => (
	<div className={styles.emptyContainer}>
		{isLoading === false ? (
			<div className={styles.spinner}>
				<Spinner />
			</div>
		) : (
			<div className={styles.emptyWrapper}>
				<Empty />
				<span className={styles.upperText}>Ooops… It’s empty here</span>
				<span className={styles.lowerText}>There are no products on the list</span>
			</div>
		)}
	</div>
);

export default RSpinner;
