/**
 * DoctorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getMyPatients: async ( req, res ) => {
        try {            
            let doctorID  = req.param('doctorID');

            patientInfo = await Users.find( { 
               where: { roles: ["Patient"], canAccess: [ doctorID ] },               
               select: ['name', 'email', 'avatarURL', 'notes'],
               sort: 'name ASC'
            } )
            .then(function (patients) { 
                console.log(patients);

                return res.json( patients );
            })
            .catch(function (error) { 
                console.log(error);
                return res.serverError(error);
            });
            

        } catch (error) {
            console.log(error);
            res.serverError(error);
        }
    },

};

