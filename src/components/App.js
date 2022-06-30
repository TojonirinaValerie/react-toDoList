import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import initialData from '../initialData';
import AddTask from './AddTask';
import NavBar from './NavBar';
import ToDoList from './ToDoList';
import uniqueid from 'uniqueid';
import Fetching from './Fetching';

class App extends React.Component {
	state = {
		tasks: [],
		fetching: true,
	};

	componentDidMount = ()=> {
		let delay = Math.floor(Math.random() * 5000 );
		setTimeout( ()=> {
			this.setState({
				tasks: initialData,
				fetching: false
			})
		}, delay);
	}

	onToggleCompleted = (taskId) => { 
		let updateTask = this.state.tasks.find((task) => task.id === taskId);
		updateTask.completed = !updateTask.completed;

		this.setState((previousState) =>
			previousState.tasks.map((task) => {
				return task.id === taskId ? updateTask : task;
			})
		);
	};

	onAddTask = (newTaskName) => {
		let newTask = {
			id: uniqueid(),
			name: newTaskName,
			completed: false,
		};

		this.setState((previousState) => ({
			tasks: [...previousState.tasks, newTask],
		}));
	};

	onDeleteCompleted = () => {
		this.setState((previousState) => {
			return {
				tasks: previousState.tasks.filter((task) => !task.completed),
			};
		});
	};

	render() {
		return (
			<section id="todo">
				{this.state.fetching ? <Fetching /> : null}
				<BrowserRouter>
					<Switch>
						<Route path="/add-task" render={(props) => <AddTask {...props} onAddTask={this.onAddTask} />} />
						<Route
							path="/:filter?"
							render={(props) => <ToDoList {...props} tasks={this.state.tasks} onToggleCompleted={this.onToggleCompleted} />}
						/>
					</Switch>
					<NavBar onDeletCompleted={this.onDeleteCompleted} />
				</BrowserRouter>
			</section>
		);
	}
}

export default App;
