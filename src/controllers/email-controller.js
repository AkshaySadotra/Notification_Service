const{EmailService} = require('../services');
const { SuccessResponse,ErrorResponse } = require('../utils/common');
const {StatusCodes} = require('http-status-codes')

async function create(req,res){
try {
    const response = await EmailService.createTicket({
        subject: req.body.subject,
        content:req.body.content,
        recepientEmail: req.body.recepientEmail
    });
    SuccessResponse.data = response
    return res.status(StatusCodes.OK).json(SuccessResponse)
} catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse)
}
}
module.exports = {
    create
}