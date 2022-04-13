import styles from './Avatar.module.scss';
import avatar from '../../assets/images/avatar.png';

const Avatar = () => {
	return <img className={styles.avatar} src={avatar} />;
};

export default Avatar;
