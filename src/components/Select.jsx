import PropTypes, { object } from 'prop-types'
import React from 'react'


const Select = (props) => {

    const {
		label = "Select",
		id = "genericSelect",
		value,
		onChange,
		options,
		error
	} = props

	return (
		<div>
			<label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">{label}</label>
			<select
				id={id}
				className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
				value={value}
				onChange={onChange}
			>
			<option value="">Seleccione una fórmula</option>
				{options.map((num) => (
					<option key={num.value} value={num.value}>
						{num.label}
					</option>
				))}
			</select>
			<span htmlFor={id} className='text-xs font-light text-red-400'>{error}</span>
		</div>
	)
}

Select.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(object),
	error: PropTypes.string
};

export default Select