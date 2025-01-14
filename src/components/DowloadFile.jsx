import PropTypes from 'prop-types'
import React from 'react'

const DownloadFile = (props) => {

    const {
        filePath,
        onClick
    } = props

    return (
        <section className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:px-6 rounded">
            <div className="text-center">
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Archivo generado: {filePath}
                </p>
                <div className="mt-3">
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    onClick={onClick}
                >
                    Descargar archivo
                </button>
                </div>
            </div>
        </section>
    )
}

DownloadFile.propTypes = {
    filePath: PropTypes.string,
    onClick: PropTypes.func
}

export default DownloadFile