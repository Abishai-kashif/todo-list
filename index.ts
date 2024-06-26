#! /usr/bin/env node

import inquirer from "inquirer";
import chalk, { ChalkInstance } from "chalk";

// constant aliases for custom colors
const COLOR_GRAY: ChalkInstance = chalk.hex("#333333");
const COLOR_MAROON: ChalkInstance = chalk.hex("#850000");
const COLOR_TEEL_GREEN: ChalkInstance = chalk.hex("#0D9276");

console.log(
	COLOR_GRAY.bold(
		"\n\t\t---------------------------------------------------------------"
	)
);
console.log(
	COLOR_GRAY.bold(
		`\t\t>>>>>>>>>>>>>>> ${chalk.white.bold.italic(
			"WELLCOME TO MY TODO-LIST!"
		)} <<<<<<<<<<<<<<<<<<<<<`
	)
);
console.log(
	COLOR_GRAY.bold(
		"\t\t---------------------------------------------------------------\n"
	)
);

let todoList: string[] = [];

let flag = true;

let main = async () => {
	while (flag) {
		console.log(); // printing an empty space for readability

		let selectedOption = await inquirer.prompt({
			name: "option",
			type: "list",
			message: chalk.hex("#8feeaa").bold("Select an option:"),
			choices: [
				"Add a task to the todo list.",
				"Delete task from todo list.",
				"Update task from todo list.",
				"Show todo list",
				COLOR_MAROON.bold("Exit"),
			],
		});

		console.log(); //print an empty space

		//Conditional Statements
		if (selectedOption.option === "Add a task to the todo list.") {
			await addTask();
		} else if (selectedOption.option === "Delete task from todo list.") {
			await delTask();
		} else if (selectedOption.option === "Update task from todo list.") {
			await updateTask();
		} else if (selectedOption.option === "Show todo list") {
			await viewTasks();
		} else if (selectedOption.option === COLOR_MAROON.bold("Exit")) {
			flag = false;
		}
	}
};

//function for adding task
let addTask = async () => {
	let addTask = await inquirer.prompt({
		name: "task",
		type: "input",
		message: chalk.gray.bold(
			"What do you wants to add in your todo list: "
		),
		validate: (ans: string) => {
			if (ans.length === 0) {
				return "You must enter a task.";
			} else {
				return true;
			}
		},
	});

	todoList.push(addTask.task);
	console.log(
		chalk.white.bold(
			`\n${COLOR_TEEL_GREEN.bold(
				`"${addTask.task}"`
			)} is successfully added to your todo list.`
		)
	);
};

//function for deleting task
let delTask = async () => {
	if (todoList.length !== 0) {
		let delTask = await inquirer.prompt({
			name: "task",
			type: "checkbox",
			message: chalk.gray.bold(
				"What you wants to delete from your todo list:"
			),
			choices: todoList,
			validate: (ans: string) => {
				if (ans.length === 0) {
					return "You must select at least one task.";
				} else {
					return true;
				}
			},
		});

		delTask.task.forEach((val: string) => {
			todoList.splice(todoList.indexOf(val), 1);
		});

		console.log(
			COLOR_MAROON.bold.underline(
				"\n\tThese items are removed from your todo list: "
			)
		);

		delTask.task.forEach((val: string, idx: number) => {
			console.log(chalk.white.bold(`${idx + 1}- ${val}.`));
		});
	} else {
		console.log(
			chalk.white.bold(
				"You have nothing to remove from your todo list first add something."
			)
		);
	}
};

//function for update task
let updateTask = async () => {
	if (todoList.length !== 0) {
		let updateTask = await inquirer.prompt({
			name: "task",
			type: "list",
			message: chalk.gray.bold(
				"What you wants to update from your todo list:"
			),
			choices: todoList,
		});

		let newTask = await inquirer.prompt({
			name: "task",
			type: "input",
			message: chalk.gray.bold("Enter the new task: "),
		});

		todoList.splice(todoList.indexOf(updateTask.task), 1, newTask.task);

		console.log(
			chalk.white.bold(
				`\n${COLOR_MAROON.bold(
					`"${updateTask.task}"`
				)} is successfully updated to ${COLOR_TEEL_GREEN.bold(
					`"${newTask.task}"`
				)}.`
			)
		);
	} else {
		console.log(
			chalk.white.bold("You have nothing to update in your todo list.")
		);
	}
};

//function for view todo list
let viewTasks = async () => {
	if (todoList.length !== 0) {
		console.log(COLOR_TEEL_GREEN.bold.underline("\tYour todo list:"));

		todoList.forEach((val: string, idx: number) => {
			console.log(chalk.white.bold(`${idx + 1}- ${val}.`));
		});
	} else {
		console.log(chalk.white.bold("Your todo list is empty."));
	}
};

main(); //avoking main function
