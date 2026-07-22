// GOLBAL FAIL RESPONSE
export const failResponse = ({ response, message = "failed",  statusCode = 400 }) => {
    return response.status(statusCode).json({
        success: false,
        message,
    });
}
// DATA IS NOT FOUND RESPONSE 
export const dataNotFoundResponse = ({
    response,
    message = "data",

})=>{
    return failResponse({
        response,
        message: `${message} is not found successfully`,
    })

}
// AUTHORIZED RESPONSE 
export const authorizedResponse = ({
    response,
    message = "authorized",

})=>{
    return failResponse({
        response,
        message: `${message} Access `,

        statusCode: 404
    })

}
// BAD REQUEST RESPONSE
export const badRequestResponse = ({
    response,
    message = "bad request",

}) => {
    return failResponse({
        response,
        message,

        statusCode:400
    });
};
// INTERNAL SERVER RESPONSE
export const internalServerResponse = ({
    response,
    message = "internal server",

}) => {
    return failResponse({
        response,
        message,
        statusCode:500
    });
};
// INVALID TOKEN RESPONSE
export const invalidTokenResponse = ({
    response,
    message = "Invalid Token",

}) => {
    return failResponse({
        response,
        message,
        statusCode:400
    });
};