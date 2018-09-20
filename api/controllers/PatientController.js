/**
 * PatientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var randomize = require('randomatic');
module.exports = {
  
    createPatient: async  (req, res) => {
        try {
            let data = { 
                        name: req.body.name, 
                        email: req.body.email, 
                        roles: ["Patient"], 
                        canAccess: req.body.canAccess,
                        password: randomize('Aa0!', 10),
                        notes: req.body.notes
            }

            let newUser = await Users.create( data ).fetch();
            res.send(newUser);
        }    
        catch (e) {
            console.error(e);
            res.serverError(e);
        }
    },
    getPatient: async ( req, res ) => {
        try {
            let patientID = req.param('patientID');
            let doctorID  = req.param('doctorID');

            patientInfo = await Users.find( { 
               where: { id: patientID, roles: ["Patient"], canAccess: [ doctorID ] },               
               select: ['name', 'email', 'avatarURL', 'notes']
            } ).populate('currentSwords', {
                where: {
                  color: 'purple'
                },
                limit: 3,
                sort: 'hipness DESC'
              })
            .then(function (patient) { 
                console.log(patient);

                return res.json( patient );
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
    getHistory: async ( req, res ) => {
        try {
            
        } catch (error) {
            console.log(error);
            res.serverError(e);
        }
    }
};

