import { useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  onLogin: (event: React.FormEvent<HTMLInputElement>, authData: {}) => void;
}

const Login: React.FC<LoginProps> = (props): JSX.Element => {
  const phoneInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // frontend validations here

    props.onLogin(e, {
      phone: phoneInputRef.current.value,
      password: passwordInputRef.current.value,
    });

    phoneInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <input type="text" name="phone" id="phone" ref={phoneInputRef} />
        <input
          type="text"
          name="password"
          id="password"
          ref={passwordInputRef}
        />
        <button type="submit">login</button>
        <br />
        <Link to="/page/signup">Sign Up</Link>
      </form>
    </Fragment>
  );
};

export default Login;
