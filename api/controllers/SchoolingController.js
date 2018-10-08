/**
 * SchoolingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    uploadImage: function (req, res) {
        schoolingId = req.param('id');
        //userId = req.session.userId
        req.file('schoolingImage').upload({
            // don't allow the total upload size to exceed ~10MB
            maxBytes: 10000000
        },function whenDone(err, uploadedFiles) {
            if (err) {
                return res.serverError(err);
            }
        
            // If no files were uploaded, respond with an error.
            if (uploadedFiles.length === 0){
                return res.badRequest('No file was uploaded');
            }
        
            // Get the base URL for our deployed application from our custom config
            // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
            var baseUrl = sails.config.custom.baseUrl;
        
            // Save the "fd" and the url where the avatar for a user can be accessed
            Schooling.update( schoolingId, {
        
                // Generate a unique URL where the avatar can be downloaded.
                imageURL: require('util').format('%sschooling/image/%s', baseUrl , schoolingId),
            
                // Grab the first file and use it's `fd` (file descriptor)
                imageFD: uploadedFiles[0].fd
            })
            .exec(function (err){
            if (err) return res.serverError(err);
		return res.status(200).send('ok');
            });
        });
    },

    getImage: function (req, res){

        Schooling.findOne(req.param('id')).exec(function (err, school){
            if (err) return res.serverError(err);
            if (!school) return res.notFound();

            // Schooling has no avatar image uploaded.
            // (should have never have hit this endpoint and used the default image)
            if (!school.imageFD) {
            return res.notFound();
            }
            var baseUrl = sails.config.custom.baseUrl;  
            res.sendFile(school.imageFD);
        });
    }

};

