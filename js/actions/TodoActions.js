import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

class TodoActions {

    static create(text) {
        AppDispatcher.dispatch({
            actionType : TodoConstants.TODO_CREATE,
            text : text
        });
    }

    static updateText(id, text) {
        AppDispatcher.dispatch({
            actionType : TodoConstants.TODO_UPDATE_TEXT,
            id : id,
            text : text
        });
    }

    static toggleComplete(todo) {
        var id = todo.id;
        var actionType = todo.complete ?
            TodoConstants.TODO_UNDO_COMPLETE :
            TodoConstants.TODO_COMPLETE;

        AppDispatcher.dispatch({
            actionType : actionType,
            id : id
        });
    }

    static toggleCompleteAll() {
        AppDispatcher.dispatch({
            actionType : TodoConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    }

    static destroy(id) {
        AppDispatcher.dispatch({
            actionType : TodoConstants.TODO_DESTROY,
            id : id
        });
    }

    static destroyCompleted() {
        AppDispatcher.dispatch({
            actionType : TodoConstants.TODO_DESTROY_COMPLETED
        });
    }
}

export default TodoActions;