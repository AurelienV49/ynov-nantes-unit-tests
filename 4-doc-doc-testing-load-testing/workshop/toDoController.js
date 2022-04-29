const ToDoService = require('./toDoService');
const {helperTodoCreation} = require('./HelperService');

const getTodo = (req, res) => {
  ToDoService.list()
    .then((toDos) => res.status(200).send(toDos))
    .catch((err) => res.status(400).send(err));
}

const postTodo = (req, res) => {

  if (!helperTodoCreation(req)) {
    res.status(400).send('Incorrect');
  } 

  const body = req.body;
  ToDoService.create(body.text)
    .then((savedToDo) => res.status(201).send(savedToDo))
    .catch((err) => res.status(400).send(err));
}

const patchTodo = (req, res) => {
  const { id } = req.params;
  ToDoService.patch(id)
      .then((toDo) => res.status(200).send(toDo))
      .catch((err) => res.status(400).send(err));
}

module.exports = {
  getTodo, postTodo, patchTodo
}