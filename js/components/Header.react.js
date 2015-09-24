import React from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <header id='header'>
                <h1>todos</h1>
                <TodoTextInput
                    id='new-todo'
                    placeholder='what need to be done?'
                    onSave={text=>this._onSave(text)}
                    />
            </header>
        )
    }

    _onSave(text) {
        if (text.trim()) {
            TodoActions.create(text);
        }
    }
}
export default Header;