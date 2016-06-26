import * as React from 'react';
import { Component, PropTypes } from 'react';

export interface PickerPropTypes{
	options:string[];
	value:string;
	onChange:(val)=>any;
}


const renderOption = (option) => (
	<option value={option} key={option}>
		{option}
	</option>);

const pickValue = (e:React.FormEvent,onChange) => onChange((e.target as HTMLInputElement).value)

const Picker:React.StatelessComponent<PickerPropTypes> = ({ value, onChange, options }) => (
	<span>
		<h1>{value}</h1>
		<select onChange={e=>pickValue(e,onChange)} value={value}>
			{ options.map(renderOption) }
		</select>
	</span>);

Picker.propTypes = 
	{ options: PropTypes.arrayOf
		( PropTypes.string.isRequired
		).isRequired
	, value: PropTypes.string.isRequired
	, onChange: PropTypes.func.isRequired
}

export default Picker;