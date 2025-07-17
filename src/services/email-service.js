const {TicketRepository} = require('../repositories')
const  ticketrepo = new TicketRepository();

const {Mailer} = require('../config');

async function sendEmail(mailFrom, mailTo ,subject, text ){
    try {
        const response = await Mailer.sendMail({
            from:mailFrom,
            to:mailTo, 
            subject:subject, 
            text:text
        })
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createTicket(data) {
    try {
        const response = await ticketrepo.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function getAllPendingEmails(){
   try {
     const response = await ticketrepo.getAllPendingMails();
    return response;
   } catch (error) {
     console.log(error);
        throw error;
   }
}

module.exports ={
    sendEmail,
    createTicket,
    getAllPendingEmails
}