import { ChangeEventHandler } from 'react';
import Checkbox from '../../../../components/checkbox/Checkbox';
import Logo from '../../../../components/logo/Logo';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import { ReactComponent as Search } from '../../../../assets/icons/Shape.svg';
import styles from './Header.module.scss';

interface HeaderProps {
	onChangePromo: () => void;
	onChangeActive: () => void;
	onChangeSearch: ChangeEventHandler<HTMLInputElement>;
	routeChange: () => void;
	isActiveItem: boolean;
	isPromoItem: boolean;
}

const Header: React.FC<HeaderProps> = ({
	onChangePromo,
	onChangeActive,
	onChangeSearch,
	isActiveItem,
	isPromoItem,
	routeChange,
}) => {
	return (
		<>
			<div className={styles.header}>
				<div className={styles.logoContainer}>
					<Logo />
				</div>
				<div className={styles.searchContainer}>
					<Input id={'Search'} placeholder={'Search'} hasIcon={<Search />} onChange={onChangeSearch} />
				</div>
				<div className={styles.checkboxContainer}>
					<Checkbox label={'Active'} value={isActiveItem} onChange={onChangeActive} />
					<Checkbox label={'Promo'} value={isPromoItem} onChange={onChangePromo} />
				</div>
				<div className={styles.loginContainer}>
					<Button variant="ghost-primary" onClick={routeChange}>
						<span>Login</span>
					</Button>
				</div>
			</div>
		</>
	);
};

export default Header;
