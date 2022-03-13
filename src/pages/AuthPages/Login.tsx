import ReactDOM from 'react-dom';

import { useAppDispatch } from '../../store/hooks';
import { sendLoginData } from '../../store/Authentication/authenticationActions';
import { authActions } from '../../store/Authentication/authentication';
import { userActions } from '../../store/User/user';

import styles from './Login.module.css';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Header from '../../components/UI/Header/Header';

const Login: React.FC = () => {
  console.log('LOGIN RUNNING!');
  const dispatch = useAppDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      phone: e.target.phone.value,
      password: e.target.password.value,
    };

    dispatch(sendLoginData(loginData)).then((response) => {
      ReactDOM.unstable_batchedUpdates(() => {
        dispatch(
          authActions.login({
            isAuth: true,
            token: response.data.token,
            userId: response.data.user._id,
          })
        );

        dispatch(userActions.createUser(response.data.user));
        console.log(response.data.message);
      });
    });
  };

  return (
    <div className={styles['loginPage']}>
      <Header backLink='/' content='Login' />
      <form onSubmit={formSubmitHandler} className={styles['form']}>
        <Input
          label='Phone Number'
          name='phone'
          type='text'
          placeholder='03158542543'
        />
        <Input label='Password' name='password' type='password' />
        <Button btnClass='primary'>Login</Button>
      </form>
    </div>
  );
};

export default Login;
