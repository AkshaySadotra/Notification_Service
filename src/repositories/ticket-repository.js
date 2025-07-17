const CrudRepository = require('./crud-repository');
const {Ticket} = require('../models')
const{Enum} = require('../utils/common')
const{PENDING} = Enum.STATUS
class TicketRepository extends CrudRepository{
    constructor(){
        super(Ticket);
    }

    async getAllPendingMails(){
        const response = await Ticket.findAll({
            where:{
                status:PENDING
            }
        })
        return response
    }
}

module.exports = TicketRepository;