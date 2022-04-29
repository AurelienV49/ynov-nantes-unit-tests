const { ToDo } = require('./toDoModel');

const list = () => {
    return ToDo.find();
}

const create = (text) => {
    const toDo = new ToDo({
        text: text,
      });
    return toDo.save(toDo)
}

const patch = (id) => {
    return ToDo.findOneAndUpdate({ _id: id }, { done: true })
}

module.exports = { list, create, patch }