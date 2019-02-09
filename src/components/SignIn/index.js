import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';
import './SignIn.css';

const SignInPage = () => (
  <div className="mainForm">
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  state = { ...INITIAL_STATE };
  
  onSubmit = (event) => {
    const { email, password } = this.state;
    
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error });
      });
    
    event.preventDefault();
  };
  
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Card className="login-form">
          <CardContent>
            <img src="/img/logo.png" alt="logo" className="login-form-logo" />
            <div className="login-form-site-name">EazyUp</div>
            <TextField
              id="email"
              name="email"
              label="Электронная почта"
              className="textField"
              value={email}
              type="email"
              onChange={this.onChange}
              margin="normal"
            />
            <TextField
              id="password"
              name="password"
              label="Пароль"
              className="textField"
              value={password}
              type="password"
              onChange={this.onChange}
              margin="normal"
            />
            {error && <p className="errorField">{error.message}</p>}
          </CardContent>
          <CardActions>
            <Button
              disabled={isInvalid}
              variant="contained"
              color="primary"
              type="submit"
              className="login-form-submit-btn"
            >
              Войти
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export { SignInForm, SignInPage };
