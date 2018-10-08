/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  'GET /patient/:patientID/doctor/:doctorID':         { controller: 'PatientController', action: "getPatient" }, 
  
  'GET /doctor/:doctorID':                            { controller: 'DoctorController', action: 'getDoctorInfo' },

  'GET /doctor/:doctorID/patients':                   { controller: 'DoctorController', action: "getMyPatients" }, 
  
  'PUT /v1.0/doctor/:doctorID':                       { controller: 'DoctorController', action: 'update' },
  
  'GET /patient/:id/history':                         { controller: 'PatientController', action: "getHistory" },   

  'POST /patient/':                                   { controller: 'PatientController', action: "createPatient" }, 

  'POST /users/:id/avatar':                           { controller: 'UsersController', 
                                                        action:'uploadAvatar', 
                                                        cors: {
                                                            allowOrigins: '*',
                                                            allowRequestHeaders: 'Content-Type, Authorization'  
                                                        } 
                                                      },
                                                      
  'GET /users/avatar/:id':                            { controller: 'UsersController', action:'avatar' },

  'POST /services/:id/image':                         { controller: 'ServicesController', action:'uploadImage' },
  'GET /services/image/:id':                          { controller: 'ServicesController', action:'getImage' },

  
  'POST /v1.0/account' :                              { controller: 'AccountController', action:'create' },
  'POST /v1.0/account/login' :                        { controller: 'AccountController', action: 'login' },

  'POST /schooling/:id/image':                         { controller: 'SchoolingController', action:'uploadImage' },
  'GET /schooling/image/:id':                          { controller: 'SchoolingController', action:'getImage' },

  'POST /checkups/:id/image':			      { controller: 'CheckupsController', action: 'uploadImage' },
  'GET /checkups/image/:id':			      { controller: 'CheckupsController', action: 'getImage' },

  'GET /appointments/:patientID/doctor/:doctorID':   { controller: 'AppointmentsController', action:'getPatientHistory' },  

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
