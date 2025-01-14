import { FORM_FIELD_MAPPING } from '../Constants'

export const formUtils = {
    createFormData(formState) {
        const formData = new FormData();
        Object.entries(formState)
        .filter(([, value]) => value)
        .forEach(([key, value]) => {
            formData.append(FORM_FIELD_MAPPING[key], value);
        });
        return formData;
    },

    downloadFile(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    }
};