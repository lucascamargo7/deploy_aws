const mailer = require("nodemailer");

module.exports = (email, nome, assunto, mensagem, anexo) => {
    

    //const smtpTransport = mailer.createTransport({
     //   host: 'smtp.gmail.com',
     //   port: '587',
       // secure: false, //SSL/TLS
     //   auth: {
     //       user: 'ti.vistalegre@gmail.com',
    //        pass: 'vista.2016'
    //    }
    //})

    const smtpTransport = mailer.createTransport({
        host: 'smtp.vistalegre.ind.br',
        port: '587',
        //secure: false, //SSL/TLS
        auth: {
            user: 'lucas.pereira@vistalegre.ind.br',
            pass: 'Ln324915'
        }
    })
    
    const mail = {
        from: `${nome} <lucas.pereira@vistalegre.ind.br>`,
        to: 'comunicacaosite@vistalegre.ind.br',//'@vistalegre.ind.br', //'lucas.pereira@vistalegre.ind.br',//'ti.vistalegre@gmail.com',
        subject: `${assunto}`,
        text: `Email de contato ${email} - ${mensagem}`
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"

    
    }
    
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}