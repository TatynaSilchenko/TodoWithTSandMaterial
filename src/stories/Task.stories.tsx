import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';
import { AddItemForm,AddItemFormPropsType } from '../AddItemForm';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";

export default {
  title: 'Todolist/Task',
  component: Task,
} as Meta;


const changeTaskStatusCallback=action("Status changed inside task")
const changeTaskTitleCallback=action("Title changed inside task")
const removeTaskCallback=action("Remove button  inside task clicked")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs={
  changeTaskStatus:changeTaskStatusCallback,
  changeTaskTitle:changeTaskTitleCallback,
  removeTask:removeTaskCallback,
}

export const TaskExample = Template.bind({});



TaskExample.args = {
    ...baseArgs,
  task:{id:'1', isDone:false, title:'JS'},
  todolistId:'todolistId1'
};
