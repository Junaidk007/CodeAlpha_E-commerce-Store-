class ApiResponse{
    constructor(statusCode,success,message,data){
        this.statusCode = statusCode
        this.success = success
        this.message = message
        this.data = data
    }
}
module.exports = ApiResponse;