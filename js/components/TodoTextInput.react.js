import React from 'react';

const ReactPropTypes = React.PropTypes;
const ENTER_KEY_CODE = 13;

class TodoTextInput extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value : props.value || ''
        }
    }

    static propTypes = {
        className : ReactPropTypes.string,
        id : ReactPropTypes.string,
        placeholder : ReactPropTypes.string,
        onSave : ReactPropTypes.func.isRequired,
        value : ReactPropTypes.string
    };

    render() {
        return (
            <input
                className={this.props.className}
                id={this.props.id}
                placeholder={this.props.placeholder}
                onBlur={()=>this._save()}
                onChange={event=>this._onChange(event)}
                onKeyDown={event=>this._onKeyDown(event)}
                value={this.state.value}
                autoFocus={true}
                />
        )
    }

    _save() {
        this.props.onSave(this.state.value);
        this.setState({
            value : ''
        });
    }

    _onChange(event) {
        this.setState({
            value : event.target.value
        });
    }

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    }
}

export default TodoTextInput;