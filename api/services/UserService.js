var ObjectId = require('mongodb').ObjectID
var bcrypt = require('bcryptjs');
const saltRounds = 10

module.exports = {
	update : function(userId,params){
		return new Promise(function(resolve, reject) {
			Users.update(function(err, collection) {
				if(err)
					return reject({ error : true, message : "Internal server error", status : 500 });
				var query = { $set : { }};
				if(params.name)
					query.$set.name = params.name;
	
				collection.findAndModify({
                    _id : ObjectId(userId.toString()),                    
					active : true
				},{
					// sort
				},query,{
					new : true,
					fields : {
						password : 0
					}
				},function(err,result){
					if(err)
						return reject({ error : true, message : "Internal server error", status : 500 });
					if(result && result.value)
						return resolve(result.value);
					//el usuario no existe
					return resolve(false);
				});
			});	
		});
	},
	validPassword : function(hashdb,plainpassword){
		return new Promise(function(resolve, reject) {
			bcrypt.compare(plainpassword, hashdb, function(err, res) {
				if (err)
					return reject({
						error: true,
						message: 'Internal server error',
						status: 500
					})	
				return resolve(res ? true : false)
			})
		})
	},
	password: function(password) {
	return new Promise(function(resolve, reject) {
	  bcrypt.genSalt(saltRounds, function(err, salt) {
	    if (err)
	      return reject({
	        error: true,
	        message: 'Internal server error',
	        status: 500
	      })
	    bcrypt.hash(password, salt, function(err, hash) {
	      if (err)
	        return reject({
	          error: true,
	          message: 'Internal server error',
	          status: 500
	        })
	      return resolve(hash)
	    })
	  })
	})
	},
	findByEmail   : function(email){
		return new Promise(function(resolve, reject) {
			Users.native(function(err, collection) {
				if(err)
					return reject({ error : true, message : "Internal server error" , status : 500 });
				collection.findOne({
					active : true,
					email  : email
				},function(err,user){
					if(err)
						return reject({ error : true, message : "Internal server error", statis : 500 });
					return resolve( user );
				});
			})
		});
	},
	existsByEmail : function(email){
		return new Promise(function(resolve, reject) {
			Users.native(function(err, collection) {
				if(err)
					return reject({ error : true, message : "Internal server error" , status : 500 });
				collection.count({
					email : email
				},function(err,total){
					if(err)
						return reject({ error : true, message : "Internal server error", statis : 500 });
					return resolve( (total ? true : false  ) );
				});
			})
		});
	},
	create : function(params,password){
		//recuerda usar siempre promise se vera mas pro tu desarrollo ;)
		return new Promise(function(resolve, reject) {
            
			Users.native(function(err, collection) {
				if(err)
					return reject({ error : true, message : "Internal server error" , status : 500 });
				var query = {
					active 		: true,
					createdAt 	: new Date(),
					email 		: params.email,
					password 	: password
				}

				if(params.name)
					query.name = params.name;
				

				collection.insert(query,function done(err,result){
					if(err)
						return reject({ error : true, message : "Internal server error", statis : 500 });
					//todo salio bien :D regresamos el user que se inserto
					return resolve(result.ops[0]);
				});
			});
		})
	}
}
