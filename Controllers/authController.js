const User = require('../models/User')
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // find the user that tries to login
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.status(401).json({ 'message': 'Unauthorized' });; //Unauthorized -> user not found in DB!

    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        res.status(201).json( { 'message' : `User ${user} is logged in!`} )

        console.log({
            "message" : `User ${match.name} is logged in!`
        })
        // create JWT's below here for protected routes(admin) ....
        // ...
    } else {
        res.sendStatus(401); //Unauthorized 
    }
}

module.exports = { handleLogin };