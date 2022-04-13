import React, { ChangeEventHandler, ReactElement } from 'react';
import styles from './Input.module.scss';
import cx from 'classnames';

interface InputProps {
	id: string;
	label?: string;
	placeholder: string;
	hasIcon?: ReactElement;
	type?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ id, label, placeholder, hasIcon, type, onChange }) => (
	<label htmlFor={id} className={styles.label}>
		{label && label}
		<div className={styles.wrapper}>
			<input
				id={id}
				type={type}
				className={cx(styles.input, !hasIcon && styles.inputIcon)}
				placeholder={placeholder}
				onChange={onChange}
			/>
			{hasIcon && <span className={styles.icon}>{hasIcon}</span>}
		</div>
	</label>
);

export default Input;
