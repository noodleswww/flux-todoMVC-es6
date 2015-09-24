
import AppDispatcher from '../dispatcher/AppDispatcher';
import Event from 'events';
import TodoConstants from '../constants/TodoConstants';
import assign from 'object-assign';

const EventEmitter =Event.EventEmitter;
const CHANGE_EVENT = 'change';
var _todos = {};

class _util{

    static create(text) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        _todos[id] = {
            id: id,
            complete: false,
            text: text
        };
    }

    static update(id, updates) {
        _todos[id] = assign({}, _todos[id], updates);
    }

    static updateAll(updates) {
        for (let id in _todos) {
            _util.update(id, updates);
        }
    }

    static destroy(id) {
        delete _todos[id];
    }

    static destroyCompleted() {
        for (let id in _todos) {
            if (_todos[id].complete) {
                _util.destroy(id);
            }
        }
    }
}

const TodoStore = assign({}, EventEmitter.prototype, {

    areAllComplete: function() {
        for (var id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    },

    getAll: function() {
        return _todos;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback,that) {
        this.on(CHANGE_EVENT, function () {
            that._onChange();
        });
    },

    removeChangeListener: function(callback,that) {
        this.removeListener(CHANGE_EVENT, function () {
            thia._onChange();
        });
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                _util.create(text);
                TodoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
            if (TodoStore.areAllComplete()) {
                _util.updateAll({complete: false});
            } else {
                _util.updateAll({complete: true});
            }
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_UNDO_COMPLETE:
            _util.update(action.id, {complete: false});
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_COMPLETE:
            _util.update(action.id, {complete: true});
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                _util.update(action.id, {text: text});
                TodoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_DESTROY:
            _util.destroy(action.id);
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_DESTROY_COMPLETED:
            _util.destroyCompleted();
            TodoStore.emitChange();
            break;

        default:
    }
});

module.exports = TodoStore;
