const ENVARIOMENT = "dev"
export const API_BASE_URL = ENVARIOMENT === "prod" ? import.meta.env.VITE_PROD_BASE_URL : import.meta.env.VITE_BASE_URL;
export const FORM_FIELD_MAPPING = {
  tipoProceso: "process_type",
  porcentaje: "discount_percent",
  porcentajeMod: "modified_discount_percent",
  formula: "money_formula",
  periodoPago: "payment_period",
  periodoRetroactivo: "retroactive_period",
  archivo: "file"
};