const express = require('express');
const amqplib = require('amqplib');
const {EmailService} = require('./services')
async function connectQueue(){
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        channel.consume("noti-queue", async (data)=>{
            const data1 = JSON.parse(`${Buffer.from(data.content)}`)
            await EmailService.sendEmail("t01586594@gmail.com", data1.recepientEmail, data1.subject, data1.text);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}   
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    connectQueue();
});
