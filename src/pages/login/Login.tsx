import login from '../../assets/images/login.png';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Logo from '../../components/logo/Logo';
import styles from './Login.module.scss';

export const Login = () => {
	return (
		<div className={styles.container}>
			<img src={login} className={styles.image} />
			<div className={styles.rightBox}>
				<div className={styles.logoContainer}>
					<Logo />
				</div>
				<div className={styles.loginContainer}>
					<span className={styles.title}>Login</span>
					<div className={styles.inputsWrapper}>
						<Input label="Username" placeholder="Enter username" id="Username" />
						<Input label="Password" placeholder="Enter password" type="password" id="Password" />
					</div>
					<div className={styles.btnWrapper}>
						<Button variant="primary"> Log in</Button>
					</div>
					<div className={styles.forgotPassword}>Forgot password?</div>
				</div>
			</div>
		</div>
	);
};
