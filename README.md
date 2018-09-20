# sc-clinic

a [Sails v1](https://sailsjs.com) application


### Links

+ [Get started](https://sailsjs.com/get-started)
+ [Sails framework documentation](https://sailsjs.com/documentation)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Thu Sep 13 2018 09:43:23 GMT-0600 (DST) using Sails v1.0.2.

<!-- Internally, Sails used [`sails-generate@1.15.26`](https://github.com/balderdashy/sails-generate/tree/v1.15.26/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

## Models

### Users

### Appointments

### Checkups

### Prescription

### Services

### Contact

### Login

```
POST base_url/v1.0/account/login
```
parameters: 
```
email 
password
return :token
```
all request should had the token in the header

## Custom Endpoints
    Get all patients of doctor
    ```
    :base_url/doctor/:doctor_id/patients
    ```

    Get Patient Info
    ```
    :base_url/patient/:patient_id/doctor/:doctor_id
    ```

    Patients example body request
    ```
    {
    "email": "email@email.com",
    "name": "Patient Full Name",
    "canAccess": ["doctor_id"],
    "notes": "long string"
    }
    ```
    ```
    'POST /users/:id/avatar'
    'GET /users/avatar/:id'
    ```
    field name for upload the image: "avatar"
    
    ```
    'POST /services/:id/image'
    'GET /services/image/:id'
    ```
    field name for upload the image "serviceImage"

## Redis

sudo apt-get install redis-server

redis-server --daemonize yes