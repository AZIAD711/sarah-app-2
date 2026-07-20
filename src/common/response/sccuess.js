// GOLBAL SCCUESS RESPONSE
export const successResponse = ({ response, message = "done", data, statusCode = 200 }) => {
    return response.status(statusCode).json({
        success: true,
        message,
        data 
    });
}
// DATA IS CREATED RESPONSE
export const createdDataResponse = ({
    response,
    message = "data",
    data 
}) => {
    return successResponse({
        response,
        message: `${message} created successfully`,
        data,
        statusCode: 201
    })
}
// DATA IS FOUND RESPONSE 
export const dataFoundResponse = ({
    response,
    message = "data",
    data
})=>{
    return successResponse({
        response,
        message: `${message} found successfully`,
        data,
    })

}
// DATA IS UPDATED RESPONSE
export const dataUpdatedResponse = ({
    response,
    message = "data",
    data
})=>{
    return successResponse({
        response,
        message: `${message} updated successfully`,
        data,
    })
}
// DATA IS DELETED RESPONSE
export const dataDeletedResponse = ({
    response,
    message = "data",
    data
})=>{
    return successResponse({
        response,
        message: `${message} deleted successfully`,
        data,
    })
}