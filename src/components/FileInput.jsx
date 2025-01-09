import { Upload } from 'lucide-react'
import PropTypes from 'prop-types'
import React from 'react'

const FileInput = (props) => {

    const {
        label,
        text,
        id,
        name,
        onChange,
        file,
    } = props

    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">{label}</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label htmlFor={id} className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>{text}</span>
                            <input
                                id={id}
                                name={name}
                                type="file"
                                className="sr-only"
                                onChange={onChange}
                            />
                        </label>
                    </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {file && file.name}
                </p>
                </div>
            </div>
        </div>
    )
}

FileInput.propTypes = {
    label: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    file: PropTypes.object
};

export default FileInput