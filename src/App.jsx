import React, { useState } from 'react'
import Input from "./components/input";
import Select from './components/Select';
import RadioButtons from './components/RadioButtons';
import FileInput from './components/FileInput';
import DowloadFile from './components/DowloadFile';

function App() {
	const [rutaArchivo, setRutaArchivo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const [formState, setFormState] = useState({
		tipoProceso: "1",
		porcentaje: "",
		porcentajeMod: "",
		formula: "",
		periodoPago: "",
		periodoRetroactivo: "",
		archivo: null,
	});

	const handleFormChange = (field) => (e) => {
		setFormState({
		...formState,
		[field]: field === 'archivo' ? e.target.files?.[0] || null : e.target.value
		});

		if (errors[field]) {
			setErrors({
				...errors,
				[field]: null
			});
		}
	};

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

	const validateForm = () => {
		const newErrors = {};

		if (formState.tipoProceso === "1") {
			if (!formState.porcentaje) {
				newErrors.porcentaje = "El porcentaje es requerido";
			} else if (formState.porcentaje <= 0 || formState.porcentaje > 100) {
				newErrors.porcentaje = "El porcentaje debe estar entre 0 y 100";
			}

			if (formState.porcentajeMod) {
				if (formState.porcentajeMod <= 0 || formState.porcentajeMod > 100) {
					newErrors.porcentajeMod = "El porcentaje modificado debe estar entre 0 y 100";
				}
			}

			if (!formState.formula) {
			newErrors.formula = "La fórmula es requerida";
			}

			if (!formState.periodoPago) {
				newErrors.periodoPago = "El período de pago es requerido";
			} else if (!/^\d+$/.test(formState.periodoPago)) {
				newErrors.periodoPago = "El período de pago debe contener solo números";
			}
			
			if (!formState.periodoRetroactivo) {
				newErrors.periodoRetroactivo = "La quincena retroactiva es requerida";
			} else if (formState.periodoRetroactivo && !/^\d+$/.test(formState.periodoRetroactivo)) {
				newErrors.periodoRetroactivo = "El período retroactivo debe contener solo números";
			}
		}

		if (!formState.archivo) {
			newErrors.archivo = "Debe seleccionar un archivo";
		} else {
			// Validar tipo de archivo si es necesario
			const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

			if (!allowedTypes.includes(formState.archivo.type)) {
				newErrors.archivo = "El archivo debe ser un documento de Excel (.xls o .xlsx)";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			alert("Por favor, corrija los errores en el formulario antes de continuar.");
			return;
		}

		setLoading(true);

		const formFieldMapping = {
			tipoProceso: "process_type",
			porcentaje: "discount_percent",
			porcentajeMod: "modified_discount_percent",
			formula: "money_formula",
			periodoPago: "payment_period",
			periodoRetroactivo: "retroactive_period",
			archivo: "file"
		};
		
		const formData = new FormData();
		
		Object.entries(formState).forEach(([key, value]) => {
		if (value) {
			formData.append(formFieldMapping[key], value);
		}
		});

		try {
			const response = await fetch(`${import.meta.env.VITE_BASE_URL}/procesar`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Error al procesar los datos");
			}

			const result = await response.json();
			setRutaArchivo(result.file_path);
		} catch (error) {
			console.error("Error al procesar:", error);
			alert("Hubo un error al procesar los datos.");
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = async () => {
		if (!rutaArchivo) return;

		try {
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/descargar/?fn=${rutaArchivo}`);

		if (!response.ok) {
			throw new Error("Error al descargar el archivo");
		}

		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = rutaArchivo;
		link.click();
		window.URL.revokeObjectURL(url);
		} catch (error) {
		console.error("Error al descargar:", error);
		alert("Hubo un error al descargar el archivo.");
		}
	};

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
						{rutaArchivo && <DowloadFile filePath={rutaArchivo} onClick={handleDownload}/>}
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