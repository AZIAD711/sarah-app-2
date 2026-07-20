// INSERT ONE RECORD
export const addOneRecord = async ({
    databaseType = "mongoDB",
    model,
    attributes,
}) => {
    switch (databaseType) {
        case "mySql":
            return await model.create(attributes);

        case "mongoDB":
            return await model.create(attributes);

        default:
            throw new Error("Unsupported database type");
    }
};

// INSERT MANY RECORDS
export const addManyRecords = async ({
    databaseType = "mongoDB",
    model,
    attributes,
}) => {
    switch (databaseType) {
        case "mySql":
            return await model.bulkCreate(attributes);

        case "mongoDB":
            return await model.insertMany(attributes);

        default:
            throw new Error("Unsupported database type");
    }
};