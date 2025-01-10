import React from 'react'
import { 
	Input, 
	Select, 
	RadioButtons, 
	FileInput, 
	DownloadFile 
} from './components';
import { useForm } from './Hooks/useForm';

function App() {

	const {
		formState,
		errors,
		loading,
		rutaArchivo,
		handleFormChange,
		handleSubmit,
		handleDownload
	} = useForm();

	const buttonLoadingState = loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700";

	const processOptions = [
		{ label: "Pensión alimenticia", value: "1" },
		{ label: "Juicios mercantiles", value: "2" }
	];

	const formulaOptions = [
		{ label: "Líquido", value: 1 },
		{ label: "Neto", value: 2 },
		{ label: "Solo percepciones", value: 3 },
		{ label: "Percepciones ordinarias - deducciones de ley", value: 4 },
		{ label: "Percepciones extraordinarias - deducciones de ley", value: 5 },
		{ label: "Solo ordinarias", value: 6 },
		{ label: "Solo extraordinarias", value: 7 },
		{ label: "Percepciones 07", value: 8 }
	];

	return (
		<main className="m-4 flex flex-col gap-4">
			<h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Calculadora</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-8">
				<RadioButtons
				label="Tipo de proceso"
				options={processOptions}
				value={formState.tipoProceso}
				name="tipoProceso"
				onChange={handleFormChange('tipoProceso')}
				/>

				<section className='flex flex-col md:flex-row gap-8 justify-center'>
					{formState.tipoProceso === '1' && (
						<div className='flex flex-col gap-3 w-full'>
							<Input 
								id="porcentaje"
								label="Porcentaje"
								placeholder="Ingresa el porcentaje"
								type="number"
								value={formState.porcentaje}
								onChange={handleFormChange('porcentaje')}
								error={errors.porcentaje}
							/>

							<Input 
								id="porcentajeMod"
								label="Modificar porcentaje (opcional)"
								placeholder="Ingrese el nuevo porcentaje"
								type="number"
								value={formState.porcentajeMod}
								onChange={handleFormChange('porcentajeMod')}
								error={errors.porcentajeMod}
							/>

							<Select
								label="Fórmula"
								id="formula"
								value={formState.formula}
								options={formulaOptions}
								onChange={handleFormChange('formula')}
								error={errors.formula}
							/>

							<Input 
								id="periodoRetroactivo"
								label="Quincena retroactiva"
								placeholder="Ingrese el período retroactivo"
								value={formState.periodoRetroactivo}
								onChange={handleFormChange('periodoRetroactivo')}
								error={errors.periodoRetroactivo}
							/>

							<Input 
								id="periodoPago"
								label="Períodos de Pago"
								placeholder="Ingrese los períodos de pago"
								value={formState.periodoPago}
								onChange={handleFormChange('periodoPago')}
								error={errors.periodoPago}
							/>
						</div>
					)}

					<div className={`w-full flex flex-col ${formState.tipoProceso === '1' ? 'justify-evenly' : 'gap-4'}`}>
						<FileInput
							label="Subir Archivo"
							text="Selecciona un archivo"
							id="archivo"
							name="archivo"
							onChange={handleFormChange('archivo')}
							file={formState.archivo}
							error={errors.archivo}
						/>

						<div className='aspect-auto'>
							{rutaArchivo && <DownloadFile filePath={rutaArchivo} onClick={handleDownload}/>}
						</div>
					</div>
				</section>

				<button
				type="submit"
				className={`w-full flex justify-center py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${buttonLoadingState} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
				disabled={loading}
				>
				{loading ? "Procesando..." : "Procesar"}
				</button>
			</form>
		</main>
	)
}

export default App;