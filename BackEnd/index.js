const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

let transactionArray = [];

app.use(
    express.urlencoded({
        extended:true
    })
);

app.use(express.json({
    type:"*/*"
}));

app.use(cors());

app.get('/transactions', (req, res) =>{
    res.send(JSON.stringify(transactionArray));
    //console.log('traeee');
    console.log('Me hicieron un get');
});

app.post('/transactions', (req, res) =>{
    let transaction = req.body;
    transactionArray.push(transaction);
    res.send(JSON.stringify('Guardado'));
    console.log(transactionArray);
});

app.listen(port, ()=>{
    console.log(`Estoy escuchando por el puerto ${port}`);
});