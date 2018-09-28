/**
 * ServicesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    uploadImage: function (req, res) {
        serviceId = req.param('id');
        //userId = req.session.userId
        req.file('serviceImage').upload({
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
          Services.update( serviceId, {
      
            // Generate a unique URL where the avatar can be downloaded.
            imageURL: require('util').format('%sservices/image/%s', baseUrl , serviceId),
      
            // Grab the first file and use it's `fd` (file descriptor)
            imageFD: uploadedFiles[0].fd
          })
          .exec(function (err){
            if (err) return res.serverError(err);
            return res.ok();
          });
        });
      },
  
      getImage: function (req, res){
  
        Services.findOne(req.param('id')).exec(function (err, service){
          if (err) return res.serverError(err);
          if (!service) return res.notFound();

          // Service has no avatar image uploaded.
          // (should have never have hit this endpoint and used the default image)
          if (!service.imageFD) {
            return res.notFound();
          }
	var baseUrl = sails.config.custom.baseUrl;  
        res.sendFile(service.imageFD);
        });
      }

};

