import styles from './Avatar.module.scss';
import avatar from '../../assets/images/avatar.png';

const Avatar = () => {
	return (
		<div className={styles.avatar}>
			<img src={avatar} />
		</div>
	);
};

export default Avatar;
