import styles from './Header.module.scss';
import Checkbox from '../../../../components/checkbox/Checkbox';
import Logo from '../../../../components/logo/Logo';
import Input from '../../../../components/input/Input';
import { ReactComponent as Search } from '../../../../assets/icons/Shape.svg';
import Button from '../../../../components/button/Button';
import { ChangeEventHandler } from 'react';

interface HeaderProps {
	currentPage: number;
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
				<div className={styles.avatarContainer}>
					<Button variant="ghost-primary" onClick={routeChange}>
						<span>Login</span>
					</Button>
				</div>
			</div>
		</>
	);
};

export default Header;
