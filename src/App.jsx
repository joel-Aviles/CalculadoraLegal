import React, { useState } from 'react'
import Input from "./components/input";
import Select from './components/Select';
import RadioButtons from './components/RadioButtons';
import FileInput from './components/FileInput';
import DowloadFile from './components/DowloadFile';
import { Bolt } from 'lucide-react';

function App() {
	const [tipoProceso, setTipoProceso] = useState("1");
	const [porcentaje, setPorcentaje] = useState("");
	const [porcentajeMod, setPorcentajeMod] = useState("");
	const [formula, setFormula] = useState("");
	const [periodoRetroactivo, setPeriodoRetroactivo] = useState("");
	const [periodoPago, setPeriodoPago] = useState("");
	const [archivo, setArchivo] = useState(null);
	const [rutaArchivo, setRutaArchivo] = useState(null);
	const [loading, setLoading] = useState(false);

	const buttonLoadingState = loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
	
		// Crear un objeto con los datos del formulario
		const formData = new FormData();
		formData.append("process_type", tipoProceso);

		if (porcentaje) {
		formData.append("discount_percent", porcentaje);
		}

		if (porcentajeMod) {
		formData.append("modified_discount_percent", porcentajeMod);
		}
	
		if (formula) {
		formData.append("money_formula", formula);
		}
		if (periodoPago) {
		formData.append("payment_period", periodoPago);
		}
		
		if(periodoRetroactivo) {
		formData.append("retroactive_period", periodoRetroactivo);
		}
	
		if (archivo) {
		formData.append("file", archivo);
		}
		
		try {
			// Llamada al endpoint `procesar`
			const response = await fetch(`${import.meta.env.VITE_BASE_URL}/procesar`, {
				method: "POST",
				body: formData,
			});
		
			if (!response.ok) {
				throw new Error("Error al procesar los datos");
			}
		
			const result = await response.json();
			setRutaArchivo(result.file_path); // Ruta del archivo proporcionada por la API
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
		// Llamada al endpoint `descargar`
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/descargar/?fn=${rutaArchivo}`);

		if (!response.ok) {
			throw new Error("Error al descargar el archivo");
		}

		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = rutaArchivo; // Nombre del archivo generado
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
					value={tipoProceso}
					name="tipoProceso"
					onChange={(e) => setTipoProceso(e.target.value)}
				/>

				<section className='flex flex-col md:flex-row gap-8 justify-center'>
					{tipoProceso === '1' && (
						<div className='flex flex-col gap-3 w-full'>
							<Input 
								id="porcentaje"
								label="Porcentaje"
								placeholder="Ingresa el porcentaje"
								type="number"
								value={porcentaje}
								onChange={(e) => setPorcentaje(e.target.value)}
							/>

							<Input 
								id="porcentajeMod"
								label="Modificar porcentaje (opcional)"
								placeholder="Ingrese el nuevo porcentaje"
								type="number"
								value={porcentajeMod}
								onChange={(e) => setPorcentajeMod(e.target.value)}
							/>

							<Select
								label="Fórmula"
								id="formula"
								value={formula}
								options={formulaOptions}
								onChange={(e) => setFormula(e.target.value)}
							/>

							<Input 
								id="periodoRetroactivo"
								label="Quincena retroactiva"
								placeholder="Ingrese el período retroactivo"
								value={periodoRetroactivo}
								onChange={(e) => setPeriodoRetroactivo(e.target.value)}
							/>

							<Input 
								id="periodoPago"
								label="Períodos de Pago"
								placeholder="Ingrese los períodos de pago"
								value={periodoPago}
								onChange={(e) => setPeriodoPago(e.target.value)}
							/>
						</div>
					)}

					<div className={`w-full flex flex-col ${tipoProceso === '1' ? 'justify-evenly' : 'gap-4'}`}>
						<FileInput
							label="Subir Archivo"
							text="Selecciona un archivo"
							id="archivo"
							name="archivo"
							onChange={(e) => setArchivo(e.target.files?.[0] || null)}
							file={archivo}
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
