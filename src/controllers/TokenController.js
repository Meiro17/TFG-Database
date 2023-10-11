const jwt = require('jsonwebtoken');
const tokenController = require('../controllers/TokenController');

class TokenController {

    getToken(req, res) {
        const { id }= req.body;
        const token =  jwt.sign(
            { id } ,'learningDashboardSecret',
            { expiresIn: '24h'}
        );

        return res.status(200).json({token: token});
    }

    tokenVerificationMiddleware(req, res, next) {
        let token = req.headers['x-acces-token'] || req.headers['authorization'];
        if (token == undefined) {
            return res.status(401).send("Token required");
        }
        if (token) {
            jwt.verify(
                token,
                'learningDashboardSecret',
                (err, decoded) => {
                    if (err) {
                        return res.status(403).send("Token is invalid");
                    }
                    else {
                        req.decoded = decoded;
                        next();
                    }
                }
            );
        } else {
            return res.json(
                {
                    success:false,
                    message: "Invalid token"
                }
            );
        }
    }

}

module.exports = new TokenController();