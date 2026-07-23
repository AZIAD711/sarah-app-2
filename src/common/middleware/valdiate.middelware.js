export const schemaValidate = (schema) => {
    return (request, response, next) => {
        const errors = [];

        for (const key of Object.keys(schema)) {
            const result = schema[key].validate(request[key], {
                abortEarly: false,
            });

            if (result.error) {
                errors.push(...result.error.details.map(item => item.message));
            }
        }

        if (errors.length > 0) {
            return response.status(400).json({
                success: false,
                message: "Validation Error",
                errors,
            });
        }

        next();
    };
};