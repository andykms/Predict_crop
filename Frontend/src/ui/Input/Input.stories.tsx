/*
import type { Meta, StoryObj } from '@storybook/react';
import style from './Input.module.scss'
import { Input } from './Input';

const meta: Meta<typeof Input> = {
	component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const InputWithoutError: Story = {
	render: ()=>
	<Input
	name={"Температура"}
	inputValue={"23.9"}
	pattern={".*"}
	>
	</Input>
};

export const InputWithError: Story = {
	render: ()=>
		<Input
		name={"Температура"}
		inputValue={"0"}
		errorValue={"Введите данное поле"}
		pattern={".*"}
		>
		</Input>
}
*/