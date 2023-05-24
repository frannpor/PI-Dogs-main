export const validate = (name, value) => {
    let error = "";

    switch (name) {
        case "name":
            if (!value.trim()) {
                error = "El nombre de la raza es obligatorio";
            }
            break;
        case "height":
            if (!value.trim()) {
                error = "La altura es obligatoria";
            } else if (!/^(\d{1,3})\s-\s(\d{1,3})$/.test(value)) {
                error =
                    "Formato de altura inválido. Utiliza 'número - número' (por ejemplo, '20 - 110')";
            }
            break;
        case "weight":
            if (!value.trim()) {
                error = "El peso es obligatorio";
            } else if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
                error =
                    "Formato de peso inválido. Utiliza 'número - número' (por ejemplo, '2 - 90')";
            }
            break;
        case "age":
            if (!value.trim()) {
                error = "La edad es obligatoria";
            } else if (!/^(\d{1,2})\s-\s(\d{1,2})$/.test(value)) {
                error =
                    "Formato de edad inválido. Utiliza 'número - número' (por ejemplo, '8 - 20')";
            }
            break;
        case "image":
            if (!value.trim()) {
                error = "La URL de la imagen es obligatoria";
            } else if (value.length > 200) {
                error = "La URL de la imagen no puede exceder los 200 caracteres";
            } else if (!/^https?:\/\/\S+$/.test(value)) {
                error = "URL de imagen inválida";
            }
            break;
        default:
            break;
    }

    return error;
};