const express = require('express');
const router = express.Router();
const userAuthorize = require('../../middleware/userAuthorize');
const adminAuthorize = require('../../middleware/adminAuthorize');
const { getProfile, updateProfileById, getAllStudents, getAllUsers, updateUserStatusById, deleteUserById } = require('../../controllers/profileController');


router.route('/')
    /**
        * @api {get} '/profile'
        * @apiDescription Get an user data
        * @apiPermission Only authorized user
        * 
        * @apiHeader {string:token}  Authorization User's access token
        * @userAuthorize Verify user's authorization access token by JWT
        * 
        * @apiSuccess {Object}  user data
        * 
        * @apiError (Unauthorized 401)  Only authenticated users can access the data
        * @apiError (Not Found 404)  User data not found
    */
    .get(userAuthorize, getProfile);

router.route('/:id')
    /**
        * @api {patch} '/profile/:id'
        * @apiDescription Edit user address and basic information
        * @apiPermission Only authorized user
        * 
        * @apiHeader {string:token}  Authorization User's access token
        * @userAuthorize Verify user's authorization access token by JWT
        * 
        * @apiBodyUpdate {info}  value={ name, contactNumber, birthday, avatar } 
        * @apiBodyUpdate {address}  value={ country, city, address1, zip }
        * 
        * @apiSuccess {success}  user profile updated message
        * 
        * @apiError (Unauthorized 401)  Only authenticated users can access the data
        * @apiError (Not Found 404)  User data not found
    */
    .patch(userAuthorize, updateProfileById);
    

// <!-- Admin Route -->
router.route('/students').
    /**
        * @api {get} '/profile/students'
        * @apiDescription Get all the students
        * @apiPermission Only Admin
        * 
        * @apiHeader {string:token}  Authorization User's access token
        * @userAuthorize Verify user's authorization access token by JWT
        * @adminAuthorize Verify user's role for Admin
        * 
        * @apiSuccess {Object[]}  all the students
        * 
        * @apiError (Unauthorized 401)  Only authenticated users can access the data
        * @apiError (Forbidden 403)  Only admin can access the data
    */
    get(userAuthorize, adminAuthorize, getAllStudents);

router.route('/all-users')
    /**
        * @api {get} '/profile/all-users'
        * @apiDescription Get all the Users
        * @apiPermission Only Admin
        * 
        * @apiHeader {string:token}  Authorization User's access token
        * @userAuthorize Verify user's authorization access token by JWT
        * @adminAuthorize Verify user's role for Admin
        * 
        * @apiQuery {page=1,size=15}  Users size & page list for per page
        * 
        * @apiSuccess {Object[]}  all the query users
        * 
        * @apiError (Unauthorized 401)  Only authenticated users can access the data
        * @apiError (Forbidden 403)  Only admin can access the data
    */
    .get(userAuthorize, adminAuthorize, getAllUsers);

router.route('/status/:id')
    /**
        * @api {patch} '/profile/status/:id'
        * @apiDescription Update user status for ["active", "inactive", or "blocked"] by id
        * @apiPermission Only Admin
        * 
        * @apiHeader {string:token}  Authorization User's access token
        * @userAuthorize Verify user's authorization access token by JWT
        * @adminAuthorize Verify user's role for Admin
        * 
        * @apiParams {:id}  Find user data to update status
        * @apiBody {status}  value = ["active", "inactive", "blocked"]
        * 
        * @apiSuccess {success}  User status update message
        * 
        * @apiError (Unauthorized 401)  Only authenticated users can access the data
        * @apiError (Forbidden 403)  Only admin can access the data
        * @apiError (Not Found 404)  User isn't founded
    */
    .patch(userAuthorize, adminAuthorize, updateUserStatusById);

router.route('/delete/:id')
    /**
        * @api {delete} '/profile/delete/:id'
        * @apiDescription Delete user all DB collection data by id
        * @apiPermission Only Admin
        * 
        * @apiHeader {string:token}  Authorization User's access token
        * @userAuthorize Verify user's authorization access token by JWT
        * @adminAuthorize Verify user's role for Admin
        * 
        * @apiParams {:id}  Find user data to delete
        * 
        * @apiSuccess {success}  User status update message
        * 
        * @apiError (Unauthorized 401)  Only authenticated users can access the data
        * @apiError (Forbidden 403)  Only admin can access the data and admin can't be deleted
        * @apiError (Not Found 404)  User isn't founded
    */
    .delete(userAuthorize, adminAuthorize, deleteUserById);

module.exports = router;
