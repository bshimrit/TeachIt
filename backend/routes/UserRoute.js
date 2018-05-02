const USER_URL = '/user';
const UserService = require('../services/UserService')

module.exports = (app) => {
    app.get(USER_URL, (req, res)=>{

        console.log(req.query);

        UserService.query(req.query).then(users => {
            console.log('ROUTE USERS: ', users);
            res.json(users);
        })
    })

    app.post(USER_URL, (req, res)=>{
        const user = req.body;
        UserService.add(user).then(addedUser => {
            res.json(addedUser);
        })
    })

    app.delete(`${USER_URL}/:userId`, (req, res) => {
        const userId = req.params.userId;
        if (!userId) {
            res.status(500).send('Missing userId to delete')
        }
        UserService
            .remove(userId)
            .then(_ => res.end())
            .catch(err => res.status(500).send('Could not delete user'))
    })

    app.get(`${USER_URL}/:userId`, (req, res) => {
        const userId = req.params.userId;
        UserService.getById(userId)
            .then(user => {
                res.json(user)
            })
            .catch(err => res.status(500).send(err.message))
    })

    app.put(USER_URL, (req, res) => {
        const user = req.body;
        UserService
            .update(user)
            .then(user => res.json(user))
            .catch(err => res.status(500).send('Could not update user'))
    })

}