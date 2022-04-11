import styles from './Login.module.scss';
import login from '../../assets/images/login.png';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

export const Login = () => {
	return (
		<div className={styles.container}>
			<img src={login} className={styles.image} />
			<div className={styles.rightBox}>
				<div className={styles.logo}>join.tsh.io</div>
				<div className={styles.loginContainer}>
					<span className={styles.title}>Login</span>
					<div className={styles.loginForm}>
						<Input label={'Username'} placeholder={'Enter username'} id={'Username'} />
						<Input label={'Password'} placeholder={'Enter password'} type={'password'} id={'Password'} />
					</div>
					<div className={styles.button}>
						<Button variant={'primary'} children={'Log in'} />
					</div>
					<div className={styles.forgotPassword}>Forgot password?</div>
				</div>
			</div>
		</div>
	);
};
