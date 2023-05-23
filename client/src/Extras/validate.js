export const validate = (input) => {
    let errors = {};

    if (!input.name.trim()) {
        errors.name = "El nombre de la raza es obligatorio";
    }

    if (!input.height.trim()) {
        errors.height = "La altura es obligatoria";
    } else if (!/^(\d{2})\s-\s(\d{2})$/.test(input.height)) {
        errors.height = "Formato de altura inválido. Utiliza 'número - número' (por ejemplo, '20 - 110')";
    }

    if (!input.weight.trim()) {
        errors.weight = "El peso es obligatorio";
    } else if (!/^(\d{2})\s-\s(\d{2})$/.test(input.weight)) {
        errors.weight = "Formato de peso inválido. Utiliza 'número - número' (por ejemplo, '2 - 90')";
    }

    if (!input.age.trim()) {
        errors.age = "La edad es obligatoria";
    } else if (!/^(\d{2})\s-\s(\d{2})$/.test(input.age)) {
        errors.age = "Formato de edad inválido. Utiliza 'número - número' (por ejemplo, '8 - 20')";
    }

    if (!input.image.trim()) {
        errors.image = "La URL de la imagen es obligatoria";
    } else if (!/^https?:\/\/\S+$/.test(input.image)) {
        errors.image = "URL de imagen inválida";
    }

    if (input.temperaments.length === 0) {
        errors.temperaments = "Se requiere al menos un temperamento";
    }

    return errors;
}