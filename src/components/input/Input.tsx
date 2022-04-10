import React, { ReactElement } from 'react';
import styles from './Input.module.scss';

interface InputProps {
	id: string;
	label?: string;
	placeholder: string;
	hasIcon?: ReactElement;
}

const Input: React.FC<InputProps> = ({ id, label, placeholder, hasIcon }) => (
	<label htmlFor={id} className={styles.label}>
		{label && label}
		<div className={styles.wrapper}>
			<input id={id} className={styles.input} placeholder={placeholder} />
			{hasIcon && <span className={styles.icon}>{hasIcon}</span>}
		</div>
	</label>
);

export default Input;
