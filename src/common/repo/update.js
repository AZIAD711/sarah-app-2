// UPDATE PASSWORD
export const updatePassword = async ({
    databaseType = "mongoDB",
    model,
    attributes,
    whereClause,
}) => {
    switch (databaseType) {

        // MYSQL DATABASE
        case "mySql":
            return await model.update(attributes, {
                where: whereClause,
            });

        // MONGODB DATABASE
        case "mongoDB":
            return await model.updateOne(
                whereClause,
                {
                    $set: attributes,
                }
            );

        default:
            throw new Error("Unsupported database type");
    }
};

// UPDATE ONE COLUMN
export const updateColumn = async ({
    databaseType = "mongoDB",
    model,
    columnName,
    value,
    whereClause,
}) => {
    switch (databaseType) {

        // MYSQL DATABASE
        case "mySql":
            return await model.update(
                {
                    [columnName]: value,
                },
                {
                    where: whereClause,
                }
            );

        // MONGODB DATABASE
        case "mongoDB":
            return await model.updateOne(
                whereClause,
                {
                    $set: {
                        [columnName]: value,
                    },
                }
            );

        default:
            throw new Error("Unsupported database type");
    }
};

// UPDATE MANY COLUMNS
export const updateColumns = async ({
    databaseType = "mongoDB",
    model,
    columns,
    whereClause,
}) => {
    switch (databaseType) {

        // MYSQL DATABASE
        case "mySql":
            return await model.update(columns, {
                where: whereClause,
            });

        // MONGODB DATABASE
        case "mongoDB":
            return await model.updateOne(
                whereClause,
                {
                    $set: columns,
                }
            );

        default:
            throw new Error("Unsupported database type");
    }
};