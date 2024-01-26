
const {ErrorConstants} = require('../constants');

const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode)
    {
        case ErrorConstants.VALIDATION_ERROR:
            res.json({
                title:"Validation Error.",
                message:err.message,
                // stackTrace:err.stack
            });
            break;
        
        case ErrorConstants.UNAUTHORIZED:
            res.json({
                title:"Unauthorized access.",
                message:err.message,
                // stackTrace:err.stack
            });
            break;
        
        case ErrorConstants.NOT_FOUND:
            res.json({
                title:"Not Found.",
                message:err.message,
                // stackTrace:err.stack
            });
            break;
        
        case ErrorConstants.FORBIDDEN:
            res.json({
                title:"Forbidden.",
                message:err.message,
                // stackTrace:err.stack
            });
            break;
        
        case ErrorConstants.SERVER_ERROR:
            res.json({
                title:"Server Error.",
                message:err.message,
                // stackTrace:err.stack
            });

        default:
            console.log("No Errors, all good!");
            break;
    }
};

module.exports = errorHandler;