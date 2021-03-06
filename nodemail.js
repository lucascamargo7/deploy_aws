const mailer = require("nodemailer");

module.exports = (email, nome, assunto, mensagem, anexo) => {
    

    //const smtpTransport = mailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: '587',
    // secure: false, //SSL/TLS
    //   auth: {
    //       user: 'ti.vistalegre@gmail.com',
    //        pass: '******'
    //    }
    //})

    //const smtpTransport = mailer.createTransport({
        //service: 'Hotmail',
    //    host: 'smtp.live.com',
    //    port: '587',
    //    secure: false, //use SSL
    //    auth: {
    //        user: 'comunicacaouva@hotmail.com',
    //        pass: ******'
    //    }
    //})

    const smtpTransport = mailer.createTransport({
        //service: 'Hotmail',
        host: 'smtp.vistalegre.ind.br',
        port: '587',
        //secure: false, //use SSL
        auth: {
            user: 'comunicacaosite@vistalegre.ind.br',
            pass: '******'
        },

        tls: { rejectUnauthorized: false }
    })
    
    const mail = {
        from: 'comunicacaosite@vistalegre.ind.br',
        to: 'rh@vistalegre.ind.br',
        subject: `${assunto}`,
        text: `Email de contato ${email} - ${mensagem}`
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }

    //const mail = {
    //    from: `${nome} <lucas.pereira@vistalegre.ind.br>`,
    //    to: 'comunicacaosite@vistalegre.ind.br',
    //    subject: `${assunto}`,
    //    text: `Email de contato ${email} - ${mensagem}`
    //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    //}
    
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
