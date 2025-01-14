// hooks/useFormulario.js
import { useState } from 'react';
import { formUtils } from '../utils/formUtils';
import { apiService } from '../utils/apiService';

const initialState = {
  tipoProceso: "1",
  porcentaje: "",
  porcentajeMod: "",
  formula: "",
  periodoPago: "",
  periodoRetroactivo: "",
  archivo: null,
};

export const useForm = () => {
  const [formState, setFormState] = useState(initialState);
  const [rutaArchivo, setRutaArchivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
      const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (!allowedTypes.includes(formState.archivo.type)) {
        newErrors.archivo = "El archivo debe ser un documento de Excel (.xls o .xlsx)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Por favor, corrija los errores en el formulario antes de continuar.");
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = formUtils.createFormData(formState);
      const result = await apiService.procesarDatos(formData);
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
      const blob = await apiService.descargarArchivo(rutaArchivo);
      formUtils.downloadFile(blob, rutaArchivo);
    } catch (error) {
      console.error("Error al descargar:", error);
      alert("Hubo un error al descargar el archivo.");
    }
  };

  return {
    formState,
    errors,
    loading,
    rutaArchivo,
    handleFormChange,
    handleSubmit,
    handleDownload
  };
};