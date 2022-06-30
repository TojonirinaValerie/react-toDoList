import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({ tasks, match, onToggleCompleted }) => {
	let filterTasks;

	switch (match.params.filter) {
		case 'completed':
			filterTasks = tasks.filter((task) => task.completed);
			break;
		default:
			filterTasks = tasks;
			break;
	}

	if (filterTasks.length === 0) {
		return (
			<>
				<h1 className="m-3">Liste de tâches</h1>
				<ul className="list-group m-3">
					<li className="list-group-item"> Aucune tache a afficher</li>
				</ul>
			</>
		);
	} else {
		return (
			<>
				<h1 className="m-3">Liste de tâches</h1>
				<ul className="list-group m-3">
					{
						filterTasks.map((task) => (
							<ToDo task={task} key={task.id} onToggleCompleted={onToggleCompleted}/>
						))
					}
				</ul>
			</>
		);
	}
};

export default ToDoList;
