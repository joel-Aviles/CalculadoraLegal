import React from 'react'
import PropTypes from 'prop-types';

const Input = (props) => {

    const {
        id = "genericInput", 
        label = "Input", 
        value, 
        onChange, 
        placeholder = "Placeholder", 
        disabled = false,
        type = "text"
    } = props

    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                {label}
            </label>
            <input
                id={id}
                type={type}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-white shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 dark:disabled:bg-gray-800 dark:disabled:text-gray-400 dark:disabled:border-gray-700 transition duration-150 ease-in-out"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
}

Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

export default Input