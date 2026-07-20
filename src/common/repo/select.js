// FIND ONE RECORD
export const selectOne = async ({
    databaseType = "mongoDB",
    model,
    whereClause,
    attributes = null,
    populate = [],
}) => {
    switch (databaseType) {

        // MYSQL DATABASE
        case "mySql":
            return await model.findOne({
                where: whereClause,
                attributes,
            });

        // MONGODB DATABASE
        case "mongoDB":
            return await model
                .findOne(whereClause)
                .select(attributes)
                .populate(populate);

        default:
            throw new Error("Unsupported database type");
    }
};
// FIND MANY RECORDS
export const selectMany = async ({
    databaseType = "mongoDB",
    model,
    whereClause = {},
    attributes = null,
    populate = [],
    sort = {},
    limit = 0,
    skip = 0,
}) => {
    switch (databaseType) {

        // MYSQL DATABASE
        case "mySql":
            return await model.findAll({
                where: whereClause,
                attributes,
                order: Object.entries(sort),
                limit,
                offset: skip,
            });

        // MONGODB DATABASE
        case "mongoDB":
            return await model
                .find(whereClause)
                .select(attributes)
                .populate(populate)
                .sort(sort)
                .skip(skip)
                .limit(limit);

        default:
            throw new Error("Unsupported database type");
    }
};