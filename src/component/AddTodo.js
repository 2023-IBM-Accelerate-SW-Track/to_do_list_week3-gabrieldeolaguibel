import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      date: new Date(),
      due: null
    };
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: new Date().toLocaleDateString()
    });
  };

  handleDateChange = (event) => {
    this.setState({
      due: new Date(event).toLocaleDateString()
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.addTodo({
      id: Date.now(),
      content: this.state.content,
      date: this.state.date,
      due: this.state.due
    });
    this.setState({
      content: "",
      date: new Date(),
      due: null
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          id="new-item"
          label="Add New Item"
          value={this.state.content}
          onChange={this.handleChange}
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            id="new-item-date"
            label="Due Date"
            value={this.state.due}
            onChange={this.handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
    );
  }
}

export default AddTodo;
