// DELETE RECORD FROM DATABASE
export const deleteRecord = async ({
    databaseType = "mongoDB",
    model,
    whereClause,
}) => {
    switch (databaseType) {

        // MYSQL DATABASE
        case "mySql":
            return await model.destroy({
                where: whereClause,
            });

        // MONGODB DATABASE
        case "mongoDB":
            return await model.deleteOne(whereClause);

        default:
            throw new Error("Unsupported database type");
    }
};