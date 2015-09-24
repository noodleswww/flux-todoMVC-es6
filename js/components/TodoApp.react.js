import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import React from 'react';
import TodoStore from '../stores/TodoStore';


const getTodoState = ()=> {
    return {
        allTodos : TodoStore.getAll(),
        areAllComplete : TodoStore.areAllComplete()
    }
};

class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = getTodoState()
    }

    componentDidMount() {
        TodoStore.addChangeListener(this._onChange,this);
    }

    componentWillUnmount() {
        TodoStore.removeChangeListener(this._onChange,this);
    }

    render() {
        return (
            <div>
                <Header />
                <MainSection
                    allTodos={this.state.allTodos}
                    areAllComplete={this.state.areAllComplete}
                    />
                <Footer allTodos={this.state.allTodos}/>
            </div>
        )
    }

    _onChange() {
        this.setState(getTodoState());
    }
}

export default TodoApp;