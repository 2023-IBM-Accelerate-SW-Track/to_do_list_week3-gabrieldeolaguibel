import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component doesn\'t render duplicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Duplicate Task"}});
  fireEvent.change(inputDate, { target: { value: "12/31/2023"}});
  fireEvent.click(addButton);
  fireEvent.change(inputTask, { target: { value: "Duplicate Task"}});
  fireEvent.change(inputDate, { target: { value: "12/31/2023"}});
  fireEvent.click(addButton);
  const check = screen.getAllByText(/Duplicate Task/i);
  expect(check.length).toBe(1);  // should only render one instance of "Duplicate Task"
});

test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputDate, { target: { value: "12/31/2023"}});
  fireEvent.click(addButton);
  const check = screen.queryByText("12/31/2023");
  expect(check).not.toBeInTheDocument();  // task should not be rendered as task name is missing
});

test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task without date"}});
  fireEvent.click(addButton);
  const check = screen.queryByText(/Task without date/i);
  expect(check).not.toBeInTheDocument();  // task should not be rendered as due date is missing
});

test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Task to be deleted"}});
  fireEvent.change(inputDate, { target: { value: "12/31/2023"}});
  fireEvent.click(addButton);
  const check = screen.getByText(/Task to be deleted/i);
  expect(check).toBeInTheDocument();  // check if the task is added
  const deleteCheckbox = screen.getByRole('checkbox', {name: /Task to be deleted/i});
  fireEvent.click(deleteCheckbox);
  expect(check).not.toBeInTheDocument();  // task should be deleted
});

test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const addButton = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Past Due Task"}});
  fireEvent.change(inputDate, { target: { value: "01/01/2023"}});
  fireEvent.click(addButton);
  const check = screen.getByTestId("Past Due Task");
  expect(check.style.background).not.toBe("#ffffffff");  // background color should not be white
});
