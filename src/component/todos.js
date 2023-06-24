import React from "react";
import { Card, ListItem, ListItemText, Checkbox } from '@material-ui/core';

class Todos extends React.Component {
  render() {
    return this.props.todos.map((todo) => {
      let color = "#ffffffff";
      if(new Date(todo.due) < new Date()){
        color = "#ff0000";
      }

      return (
        <Card style={{ marginTop: 10, background: color }} key={todo.id} data-testid={todo.content}>
          <ListItem component="a" href="#simple-list">
            <Checkbox
              style={{ paddingLeft: 0 }}
              color="primary"
              onClick={() => this.props.deleteTodo(todo.id)}
            />
            <ListItemText primary={todo.content} secondary={todo.due} />
          </ListItem>
        </Card>
      )
    });
  }
}

export default Todos;
