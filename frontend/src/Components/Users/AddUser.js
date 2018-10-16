import React, { Fragment, Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class AddUser extends Component {
  state = {
    email: '',
    message: '',
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { email, message } = this.state;
    const disableBtn = (/\S+@\S+\.\S+/).test(email);
    return (
      <Fragment>
        <form className="add-user">
          <div className="add-message">
            <TextField
              label="Email"
              id="filled-full-width"
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.onChangeHandler}
              margin="normal"
              variant="filled"
              InputLabelProps={{
                shrink: true,
                className: 'email',
              }}
            />
          </div>
          <div className="add-message message">
            <TextField
              label="Message"
              id="filled-full-width"
              placeholder="I'm working on this project and wanted to share it with you!"
              multiline
              name="message"
              value={message}
              onChange={this.onChangeHandler}
              margin="normal"
              variant="filled"
              InputLabelProps={{
                shrink: true,
                className: 'message',
              }}
            />
          </div>
          <Button
            disabled={!disableBtn} 
            variant="raised"
            size="small"
            type="submit"
            className="add-user-button"
            onClick={this.handleSubmit}
          >
          sent invitation
          </Button>
        </form>
      </Fragment>
    );
  }
}

export default AddUser;
