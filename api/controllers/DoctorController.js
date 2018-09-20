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
    update : function(req,res){
		var params = req.allParams();
		var userId = req.doctorID;
 
		// validamos que los parametros a actualizar sean validos
		if(!params.name || params.name.length <= 3)
			return res.send(401, { error : true, message : "El nombre es obligatorio o es muy corto", status : 401 });
        
        async.waterfall([
			function updateUser(cb){
				UserService.update(userId,params)
					.then(function($user){
						if(!$user)
							return cb({ error : true, message : "El usuario no existe", status : 404 });
						return cb(null,$user);
					}).catch(cb);
			}
		],function done(err,result){
			if (err && err.status) return res.send(err.status, err);
			else if (err)
				return res.send(500, {
					error: true,
					message: "Internal server error",
					status: 500
				});
			return res.json(result);
		});
	}
};

