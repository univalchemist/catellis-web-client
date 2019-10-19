import * as React from 'react';
import {
  withRouter,
  Redirect
} from 'react-router-dom';
import {
  compose,
  withApollo
} from 'react-apollo';
import { Form, Field } from 'react-final-form';

import apiMeQueryWrapper from 'shared/auth/api.me.query';
import apiSignInMutationWrapper from 'shared/auth/api.signIn.mutation';
import localLogInUserMutationWrapper from 'shared/auth/local.logInUser.mutation';
import { Button } from 'shared/buttons';
import {
  required,
  minLength,
  simpleEmail,
  composeValidators
} from 'shared/form/validators';
import { toastError } from 'shared/toast';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  onSubmit = async (formValue) => {
    const { props } = this;

    this.setState({isLoading: true});

    try {
      const result = await props.signIn({
        variables: {
          email: formValue.email,
          password: formValue.password
        }
      });

      const signInUserResponse: AuthenticateUser = result.data.signInUser;

      await props.logInUser({
        variables: {
          id: signInUserResponse.user.id,
          email: signInUserResponse.user.email,
          token: signInUserResponse.token
        }
      });

      props.client.resetStore();

      props.history.push(this.getRedirectPath());
    } catch (e) {
      toastError(`We could not log you in with the provided credentials.`);
      this.setState({isLoading: false});
    }
  }

  getRedirectPath = () => {
    const { from } = this.props.location.state || { from: { pathname: '/rm' } };

    return from;
  }

  render() {
    const {me} = this.props;
    if (me.loading === false && me.meUser && me.meUser.id) {
      return (
        <Redirect to={this.getRedirectPath()} />
      );
    }

    const { onSubmit } = this;
    const { isLoading } = this.state;

    return (
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit, pristine, invalid}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <Field
                name="email"
                component="input"
                placeholder="user@email.com"
                validate={composeValidators(required, simpleEmail)}
              />
            </div>
            <div>
              <label>Password</label>
              <Field
                name="password"
                type="password"
                component="input"
                placeholder="••••••••••••"
                validate={composeValidators(required, minLength(8))}
              />
            </div>
            <Button
              buttonType="submit"
              size="fl"
              buttonStyle="secondary"
              disabled={pristine || invalid || isLoading}
            >
              {isLoading ? 'Logging In' : 'Login'}
            </Button>
          </form>
        )}
      />
    );
  }
}

export default compose(
  withApollo,
  apiSignInMutationWrapper(),
  localLogInUserMutationWrapper(),
  apiMeQueryWrapper(),
  withRouter
)(Login);
