import React, { Fragment } from 'react';
import Typography from 'material-ui/Typography';
import { FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

const login = props => (
  <Paper className="login-form-content">
    <FormHelperText className="error">
      {props.userVerification}
    </FormHelperText>
    <Typography color="primary" variant="display3">
      Login
    </Typography>
    <form className="login-form">
      <Fragment>
        <TextField
          id="username"
          label="Username"
          name="username"
          value={props.username}
          onChange={props.handleFieldsChange}
          onBlur={props.handleBlur}
          margin="normal"
        />
        <FormHelperText className="error">{props.usernameErr}</FormHelperText>
      </Fragment>
      <Fragment>
        <TextField
          id="password"
          label="Password"
          name="password"
          value={props.password}
          onChange={props.handleFieldsChange}
          onBlur={props.handleBlur}
          margin="normal"
          type="password"
        />
        <FormHelperText className="error">{props.passwordErr}</FormHelperText>
      </Fragment>
      <Button onClick={props.handleLogin} variant="raised" color="primary">
        Submit
      </Button>
    </form>
  </Paper>
);

export default login;