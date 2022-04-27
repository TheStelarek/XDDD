import { Link } from 'react-router-dom';
import { AppRoute } from 'routing/AppRoute.enum';
import styles from './Logo.module.scss';

const Logo = () => {
	return (
		<Link to={AppRoute.Home} className={styles.logo}>
			Products
		</Link>
	);
};

export default Logo;
