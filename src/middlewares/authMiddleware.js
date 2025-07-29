const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.user = decoded; // Attach the decoded user to the request object
            console.log("The decorde user is: ", res.user);
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            res.status(400).json({ message: "Token is not vaild" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
    }
};



module.exports = verifyToken;