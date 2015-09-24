import React from 'react';
import TodoActions from '../actions/TodoActions';

const ReactPropTypes = React.PropTypes;

class Footer extends React.Component {
    constructor() {
        super();
    }

    static propTypes = {
        allTodos : ReactPropTypes.object.isRequired
    };

    render() {
        var allTodos = this.props.allTodos;
        var total = Object.keys(allTodos).length;

        if (total === 0) {
            return null;
        }

        var completed = 0;
        for (var key in allTodos) {
            if (allTodos[key].complete) {
                completed++;
            }
        }

        var itemsLeft = total - completed;
        var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
        itemsLeftPhrase += 'left';

        var clearCompletedButton;
        if (completed) {
            clearCompletedButton =
                <button
                    id="clear-completed"
                    onClick={()=>this._onClearCompletedClick()}>
                    Clear completed ({completed})
                </button>;
        }

        return (
            <footer id="footer">
        <span id="todo-count">
          <strong>
              {itemsLeft}
          </strong>
            {itemsLeftPhrase}
        </span>
                {clearCompletedButton}
            </footer>
        );
    }

    _onClearCompletedClick() {
        TodoActions.destroyCompleted();
    }
}
export default Footer;