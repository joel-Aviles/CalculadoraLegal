import { useState } from "react"
import { Upload } from 'lucide-react'

function App() {
  const [tipoProceso, setTipoProceso] = useState("1");
  const [porcentaje, setPorcentaje] = useState("");
  const [formula, setFormula] = useState("");
  const [periodoRetroactivo, setPeriodoRetroactivo] = useState("");
  const [periodoPago, setPeriodoPago] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [rutaArchivo, setRutaArchivo] = useState(null);
  const [loading, setLoading] = useState(false);

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
    formData.append("discount_percent", porcentaje);
  
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
      const response = await fetch("http://localhost:8000/procesar", {
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
      const response = await fetch(`http://localhost:8000/descargar/${rutaArchivo}`);

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = rutaArchivo.split('/')[3]; // Nombre del archivo generado
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar:", error);
      alert("Hubo un error al descargar el archivo.");
    }
  };

  return (
    <main className="mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Calculadora</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Tipo de Proceso</label>
            <div className="flex space-x-4">
            {processOptions.map((opt) => (
              <label key={opt.value} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio w-4 h-4 text-blue-600 transition duration-150 ease-in-out"
                  name="tipoProceso"
                  value={opt.value}
                  checked={tipoProceso === opt.value} // Comparar con el valor
                  onChange={(e) => setTipoProceso(e.target.value)} // Actualizar el estado correctamente
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
              </label>
            ))}
            </div>
          </div>

          <div>
            <label htmlFor="porcentaje" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Porcentaje</label>
            <input
              id="porcentaje"
              type="number"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-400
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                         disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 dark:disabled:bg-gray-800 dark:disabled:text-gray-400 dark:disabled:border-gray-700
                         transition duration-150 ease-in-out"
              value={porcentaje}
              onChange={(e) => setPorcentaje(e.target.value)}
              placeholder="Ingrese el porcentaje"
            />
          </div>

          {
            tipoProceso === '1' && (
              <>
                <div>
                  <label htmlFor="formula" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Fórmula</label>
                  <select
                    id="formula"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                  >
                    <option value="">Seleccione una fórmula</option>
                    {formulaOptions.map((num) => (
                      <option key={num.value} value={num.value}>
                        {num.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="periodoRetroactivo" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Quincena retroactiva</label>
                  <input
                    id="periodoRetroactivo"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-400
                              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                              disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 dark:disabled:bg-gray-800 dark:disabled:text-gray-400 dark:disabled:border-gray-700
                              transition duration-150 ease-in-out"
                    value={periodoRetroactivo}
                    onChange={(e) => setPeriodoRetroactivo(e.target.value)}
                    placeholder="Ingrese el período retroactivo"
                  />
                </div>

                <div>
                  <label htmlFor="periodoPago" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Períodos de Pago</label>
                  <input
                    id="periodoPago"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400 dark:placeholder-gray-400
                              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                              disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 dark:disabled:bg-gray-800 dark:disabled:text-gray-400 dark:disabled:border-gray-700
                              transition duration-150 ease-in-out"
                    value={periodoPago}
                    onChange={(e) => setPeriodoPago(e.target.value)}
                    placeholder="Ingrese los períodos de pago"
                  />
                </div>
              </>
            )
          }

          <div>
            <label htmlFor="archivo" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Subir Archivo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label htmlFor="archivo" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Subir un archivo</span>
                    <input
                      id="archivo"
                      name="archivo"
                      type="file"
                      className="sr-only"
                      onChange={(e) => setArchivo(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {archivo && archivo.name}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out`}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Procesar"}
            </button>
          </div>
        </form>
      </div>
      {rutaArchivo && (
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:px-6">
          <div className="text-center">
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Archivo generado: {rutaArchivo.split('/')[3]}
            </p>
            <div className="mt-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                onClick={handleDownload}
              >
                Descargar archivo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App;
