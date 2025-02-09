const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    
};


module.exports = { generateToken }; 


// we can also write like this
// import { sign } from 'jsonwebtoken';

// const generateToken = (userId, role) => {
//     return sign({ id: userId, role }, process.env.JWT_SECRET, {
//         expiresIn: '1d',
//     });
// };


// export default { generateToken }; 