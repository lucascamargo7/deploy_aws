const http = require('http'); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require("multer")();

app.use(require("cors")());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui CERTO!"});
})

app.post('/send', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const assunto = req.body.assunto;
    const anexo = req.file;
    require("./nodemail")(email, nome, assunto , mensagem, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
}) 

const server = http.createServer(app); 
//server.listen(3030);
//console.log("Servidor escutando na porta 3030...")

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`App is running on port ${ PORT }`);
});