import PropTypes, { object } from 'prop-types'
import React from 'react'


const RadioButtons = (props) => {

	const {
		label="Radio buttons",
		options=[
			{ label: "Option 1", value: "1" },
    		{ label: "Option 2", value: "2" }
		],
		value,
		name="genericRadioButtons",
		onChange
	} = props
	
	return (
		<div>
			<label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">{label}</label>
			<div className="flex space-x-4">
			{options.map((opt) => (
				<label key={opt.value} className="inline-flex items-center">
				<input
					type="radio"
					className="form-radio w-4 h-4 text-blue-600 transition duration-150 ease-in-out"
					name={name}
					value={opt.value}
					checked={value === opt.value}
					onChange={onChange}
				/>
				<span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
				</label>
			))}
			</div>
		</div>
	)
}

RadioButtons.propTypes = {
	label: PropTypes.string,
	options: PropTypes.arrayOf(object),
	value: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func
};

export default RadioButtons