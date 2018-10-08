/**
 * PrescriptionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    sendPrescriptionEmail: async ( req, res ) => {
	let appointmentID = req.param('appointmentID');
	let to_email = req.param('email');
        result = await sails.helpers.prescriptionEmail.with( { id: appointmentID, email: to_email } );

	res.json( result );
    }

};

