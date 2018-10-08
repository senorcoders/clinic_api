module.exports = {


  friendlyName: 'Prescription email',


  description: 'Will send all the prescription of one appointment',


  inputs: {
     email: {
        type: 'string',
        example: 'info@info.com',
        description: 'Destination Email',
        required: true
    },
    id: {
        type: 'string',
        example: '5ba045771131b5062bdfcaf2',
        description: 'Appointment ID',
        required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const nodemailer = require('nodemailer');
    let appointments = await Prescription.find( {
				appointment: inputs.id
      			      } );

    let prescriptions = await appointments.map( prescription => {
	return `<br />Medicamento/Tratamiento: ${prescription.name} para ${prescription.whatIsFor}, tomar ${prescription.timing} durante ${prescription.duration} `;
    } )
    

    let prescriptionsStr = '';

    if( prescriptions.length > 0 ){
      prescriptionsStr = '<h2>Receta</h2><br>' + prescriptions.join();
    }
    console.log( prescriptions );
    console.log( prescriptionsStr );

   let checkups =  await Checkups.find( { appointment: inputs.id } );

   let checkupsArr = await checkups.map( checkup => {
	return `<br />${checkup.reason} - Observacion: ${checkup.note}`
   } );

   let checkupsStr = '';
   if( checkupsArr.length > 0 ){
     checkupsStr = '<h2>Examenes</h2><br>' + checkupsArr.join();
   }
    let transporter = nodemailer.createTransport( {
	host: sails.config.custom.mailer.host,
	port: sails.config.custom.mailer.port,
	secure: true,
	auth: {
	  user: sails.config.custom.mailer.user,
	  pass: sails.config.custom.mailer.pass
	}
    } )

    let mailOptions = {
	from: 'Senorcoders Clinic <milton@senorcoders.com>',
	to: inputs.email,
	subject: 'Prescription',
	text: prescriptionsStr + checkupsStr,
	html: prescriptionsStr + checkupsStr
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           console.log(error);
	   return exits.success( error );	
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	return exits.success( `Message Sent ${ info.messageId }` );
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    // All done.
//    return exits.success( appointments );

  }


};

