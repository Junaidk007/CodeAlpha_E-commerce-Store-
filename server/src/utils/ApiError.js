class ApiError extends Error {
    constructor(statusCode,message){
        super(message)
        this.statusCode = statusCode
    }

    static badRequest(message){
        return new ApiError(400,message)
    }
    
}