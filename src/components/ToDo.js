import React from 'react';

class ToDo extends React.Component {
	state = {
		completed: this.props.task.completed,
	};

	toggleCompleted = () => {
		this.setState((previousState) => ({

            completed: !previousState.completed,
        }));
	
        this.props.onToggleCompleted(this.props.task.id);
	};

	render() {
		return (
			<li className={'list-group-item d-flex align-tiems-center ' + (this.state.completed ? 'bg-success' : '')}>
				{this.props.task.name}
				<button className={'btn btn-sm ml-auto ' + (this.state.completed ? 'btn-success' : 'btn-outline-success')} onClick={() => this.toggleCompleted()}>
					&#x2713;
				</button>
			</li>
		);
	}
}

export default ToDo;
