import cx from 'classnames';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
	label: string;
	value?: boolean;
	onChange?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, value }) => {
	return (
		<label className={styles.container}>
			<input type="checkbox" hidden onChange={onChange} checked={value} />
			<svg
				className={cx(styles.checkbox, value && styles.checkboxactive)}
				aria-hidden="true"
				viewBox="-5 2 24 5"
				fill="none"
			>
				<path d="M1 4.5L5 9L13 0" strokeWidth="1.5" stroke={value ? '#fff' : 'none'} />
			</svg>
			<span className={styles.text}>{label}</span>
		</label>
	);
};

export default Checkbox;
