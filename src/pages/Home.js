import React, { Component } from "react";
import AddTodo from "../component/AddTodo";
import Todos from "../component/Todos";

class Home extends Component {
  state = {
    todos: []
  };

  addTodo = (todo) => {
    if (
      !this.state.todos.some((item) => item.content === todo.content) &&
      !(todo.due === null || todo.due === "Invalid Date")
    ) {
      this.setState({
        todos: [...this.state.todos, todo]
      });
    }
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });
  };

  render() {
    return (
      <div>
        <h1>My Tasks</h1>
        <AddTodo addTodo={this.addTodo} />
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default Home;
