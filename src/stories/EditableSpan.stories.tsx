import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';
import { AddItemForm,AddItemFormPropsType } from '../AddItemForm';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";

export default {
  title: 'Todolist/TaskEditableSpan ',
  component: EditableSpan,
  argTypes:{
    onChange:{
      description:'Value EditableSpan changed'
    },
    value:{
      defaultValue:"HTML",
      description:"Start value EditableSpan"
    }
  }
} as Meta;


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;


export const EditableSpanExample = Template.bind({});



EditableSpanExample.args = {
  value:"Value EditableSpan changed",
};
