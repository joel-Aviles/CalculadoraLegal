import { API_BASE_URL } from '../Constants'

export const apiService = {
    async procesarDatos(formData) {
      const response = await fetch(`${API_BASE_URL}/procesar`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error al procesar los datos");
      }
  
      return response.json();
    },
  
    async descargarArchivo(rutaArchivo) {
      const response = await fetch(`${API_BASE_URL}/descargar/?fn=${rutaArchivo}`);
  
      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }
  
      return response.blob();
    }
  };