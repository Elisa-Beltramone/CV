const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT  || 5000;

// Middlewere npm run dev
app.use(express.static(`public`));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html')
})

app.post('/', (req, res)=> {
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: (
            user: 'elibeltramone@gmail.com',
            pass: 'password'
        )
    })

    const mailOptions = {
        from: req.body.email,
        to: 'elibeltramone@gmail.com',
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');

        } else {
            console.log('Email sent' + info.response);
            res.send('Success');
        }
    })
})

app.listen(PORT, () =>{ 
    console.log(`Server running on port ${PORT}`)   
})




