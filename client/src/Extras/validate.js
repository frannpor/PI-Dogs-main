//! Sujeto a cambios

export const validate = (input) => {
    let errors = {};

    if (!input.name.trim()) {
        errors.name = "Breed name is required";
    }

    if (!input.height.trim()) {
        errors.height = "Height is required";
    } else if (!/^(\d{2})\s-\s(\d{2})$/.test(input.height)) {
        errors.height = "Invalid height format. Use 'number - number' (e.g., '20 - 110')";
    }

    if (!input.weight.trim()) {
        errors.weight = "Weight is required";
    } else if (!/^(\d{2})\s-\s(\d{2})$/.test(input.weight)) {
        errors.weight = "Invalid weight format. Use 'number - number' (e.g., '2 - 90')";
    }

    if (!input.age.trim()) {
        errors.age = "Age is required";
    } else if (!/^(\d{2})\s-\s(\d{2})$/.test(input.age)) {
        errors.age = "Invalid age format. Use 'number - number' (e.g., '8 - 20')";
    }

    if (!input.image.trim()) {
        errors.image = "Image URL is required";
    } else if (!/^https?:\/\/\S+$/.test(input.image)) {
        errors.image = "Invalid image URL";
    }

    if (input.temperaments.length === 0) {
        errors.temperaments = "At least one temperament is required";
    }

    return errors;
}