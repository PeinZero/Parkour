import { useState, useRef, Fragment } from "react";

interface SignupProps {
  onSignup: (event: React.FormEvent<HTMLInputElement>, authData: {}) => void;
}

const Signup: React.FC<SignupProps> = (props): JSX.Element => {
  const usernameInputRef = useRef<HTMLInputElement>();
  const phoneInputRef = useRef<HTMLInputElement>();
  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const [formIsValid, setFormIsValid] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    // frontend validations here

    props.onSignup(e, {
      username: usernameInputRef.current.value,
      phone: phoneInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    });

    usernameInputRef.current.value = "";
    phoneInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          name="username"
          id="username"
          ref={usernameInputRef}
        />
        <input type="text" name="phone" id="phone" ref={phoneInputRef} />
        <input type="text" name="email" id="email" ref={emailInputRef} />
        <input
          type="text"
          name="password"
          id="password"
          ref={passwordInputRef}
        />
        <button type="submit">Signup</button>
      </form>
    </Fragment>
  );
};

export default Signup;
