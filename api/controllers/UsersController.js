/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    uploadAvatar: function (req, res) {
      userId = req.param('id');
      //userId = req.session.userId
      req.file('avatar').upload({
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
        Users.update( userId, {
    
          // Generate a unique URL where the avatar can be downloaded.
          avatarURL: require('util').format('%susers/avatar/%s', baseUrl, userId),
    
          // Grab the first file and use it's `fd` (file descriptor)
          avatarFD: uploadedFiles[0].fd
        })
        .exec(function (err){
          if (err) return res.serverError(err);
          return res.ok();
        });
      });
    },

    avatar: function (req, res){

      Users.findOne(req.param('id')).exec(function (err, user){
        if (err) return res.serverError(err);
        if (!user) return res.notFound();
    
        // User has no avatar image uploaded.
        // (should have never have hit this endpoint and used the default image)
        if (!user.avatarFD) {
          return res.notFound();
        }

      res.sendFile(user.avatarFD);
      });
    }
};

