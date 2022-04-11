import React, { ReactElement } from 'react';
import styles from './Input.module.scss';
import cx from 'classnames';

interface InputProps {
	id: string;
	label?: string;
	placeholder: string;
	hasIcon?: ReactElement;
	type?: string;
}

const Input: React.FC<InputProps> = ({ id, label, placeholder, hasIcon, type }) => (
	<label htmlFor={id} className={styles.label}>
		{label && label}
		<div className={styles.wrapper}>
			<input
				id={id}
				type={type}
				className={cx(styles.input, !hasIcon && styles.inputIcon)}
				placeholder={placeholder}
			/>
			{hasIcon && <span className={styles.icon}>{hasIcon}</span>}
		</div>
	</label>
);

export default Input;
