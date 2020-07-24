
const checkAuth = require('../middleware/check_auth');

module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    /**
     * @swagger
     *
     * /api/signup:
     *   post:
     *     description: Create a new User
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: mobile
     *         description: User Mobile No
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       201:
     *         description: Signup
     */
    app.post('/api/signup', users.signupUser, checkAuth);

    // Login user
     /**
     * @swagger
     *
     * /api/login:
     *   post:
     *     description: Login User
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: mobile
     *         description: User Mobile No
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Login
     */
    app.post('/api/login', users.loginUser);
    
    // Delete a user
     /**
     * @swagger
     *
     * /api/user/{userId}:
     *   delete:
     *     description: Delete User by id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userId
     *         description: User Id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete user
     */
    app.delete('/api/user/:userId', users.userDelete, checkAuth);
    
    // Get all user
    /**
     * @swagger
     *
     * /api/users:
     *   get:
     *     description: Get all users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Get all users
     */
    app.get('/api/users',users.GetAllUser);
    
    // Get Single User by Id
    /**
     * @swagger
     *
     * /api/user/{userId}:
     *   get:
     *     description: Get User by id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userId
     *         description: User Id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get user by id
     */
    app.get('/api/user/:userId',users.GetUserById);
    
    // Update Single User by Id
    /**
     * @swagger
     *
     * /api/user/{userId}:
     *   put:
     *     description: Update Single User by Id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: userId
     *         description: User Id
     *         in: path
     *         required: true
     *         type: string
     *       - name: mobile
     *         description: User Mobile No
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Update Single User by Id
     */
    app.put('/api/user/:userId', users.UpdateUserById, checkAuth);

    // Add new contact
    app.post('/api/addContact', users.AddContacts, checkAuth);

    //Extra work for angular handson for sever interation and for routing
    app.get('/api/message',users.GetMessage);
    //Get Demartment
    app.get('/api/department',users.GetDepartments);
    //Get Demartment
    app.get('/api/department/:id',users.GetDepartmentById);
    // Get Employee list Component
    app.get('/api/employee',users.GetEmployees);
    
    // Add new person
    app.post('/api/RegisterPerson', users.RegisterPerson);
    
}

