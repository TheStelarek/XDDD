import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

interface Props {
	onClick?: () => any;
	children?: React.ReactNode;
	isDisabled?: boolean;
	variant?: 'primary' | 'ghost-primary';
}

const Button: React.FC<Props> = ({ onClick, isDisabled, children, variant }) => (
	<button onClick={onClick} disabled={isDisabled} className={cx(styles.button, styles[`button-${variant}`])}>
		{children}
	</button>
);

export default Button;
