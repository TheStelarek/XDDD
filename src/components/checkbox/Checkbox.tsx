import { useState } from 'react';
import styles from './Checkbox.module.scss';
import cx from 'classnames';

function Checkbox() {
	const [isChecked, setIsChecked] = useState(false);

	return (
		<label>
			<input
				type="checkbox"
				hidden
				onChange={() => {
					setIsChecked(!isChecked);
				}}
			/>
			<svg
				className={cx(styles.checkbox, isChecked && styles.checkboxactive)}
				aria-hidden="true"
				viewBox="-5 2 24 5"
				fill="none"
			>
				<path d="M1 4.5L5 9L13 0" strokeWidth="1.5" stroke={isChecked ? '#fff' : 'none'} />
			</svg>
			Test
		</label>
	);
}

export default Checkbox;
