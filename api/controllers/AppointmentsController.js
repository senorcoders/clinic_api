/**
 * AppointmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getPatientHistory: async ( req, res ) => {
        try {
            let patientID = req.param('patientID');
            let doctorID  = req.param('doctorID');

            patientHistory = await Appointments
	    .find( {
               where: { patient: patientID },
               select: [ 'createdAt', 'datetime', 'height', 'weight', 'reason', 'notes', 'doctor']
            } )
	    .populate('doctor')
	    .sort( 'createdAt DESC' )
            .then(function (history) {
                console.log(history);
		newHistory = history.map( value => {
		  delete value.doctor.password;
		  delete value.doctor.createdAt;
		  delete value.doctor.updatedAt;
		  delete value.doctor.roles;
		  delete value.doctor.active;
		  delete value.doctor.birthday;
		  delete value.doctor.avatarURL;
		  delete value.doctor.avatarFD;
		  delete value.doctor.canAccess;
		  value.createdAt = new Date( value.createdAt );
		  value.day = sails.moment(value.createdAt).format('DD');
		  value.month = sails.moment(value.createdAt).format('MMM');
		  value.year = sails.moment(value.createdAt).format('YYYY');
		  return value;
		} )
                return res.json( newHistory );
            })
            .catch(function (error) {
                console.log(error);
                return res.serverError(error);
            });


        } catch (error) {
            console.log(error);
            res.serverError(error);
        }
    }  

};

