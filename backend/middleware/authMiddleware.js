const Clients = require('../models/clientsModel');
const jwt = require('jsonwebtoken');

const verifyRole = () => async (req, res, next) => {
  
   
    const { role: requiredRole } = req.body;
 
    const token = req.headers.authorization?.split(" ")[1]?.trim().replace(/"/g, "");
   
    if (!token) return res.status(401).send("Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        if (decoded.role !== requiredRole) {
            return res.status(403).send("Forbidden");
        }
      
        // Exclude the password field and store user in the request for the next middleware
        const user = await Clients.findById(decoded?.id).select('-password');
       
        req.user = user; // This will allow the user data to be accessed in the next middleware
        next(); // Move to the next middleware or route handler
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};

const verifyClientRole = () => async (req, res, next) => {
 
    const token = req.headers.authorization?.split(" ")[1]?.trim().replace(/"/g, "");
   
    if (!token) return res.status(401).send("Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        // Exclude the password field and store user in the request for the next middleware
        const user = await Clients.findById(decoded?.id).select('-password').populate('category_id');
        if (decoded.role !== user?.category_id?.name) {
            return res.status(403).send("Forbidden");
        }
      
       
        req.user = user; // This will allow the user data to be accessed in the next middleware
        next(); // Move to the next middleware or route handler
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};



const verifyAdmin = () => async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]?.trim().replace(/"/g, "");

    if (!token) return res.status(401).send("Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        if (decoded.role !== 'admin') {
           
            return res.status(403).send("Forbidden");
        }
      
        next(); 
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};

const verifyAdminSupplier = () => async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]?.trim().replace(/"/g, "");

    if (!token) return res.status(401).send("Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
      
        if (decoded.role !== 'admin' && decoded.role !== 'supplier') {
           
            return res.status(403).send("Forbidden");
        }
      
        next(); 
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};

const verifyLoginRole = () => async (req, res, next) => {
  
    const { role: requiredRole, mobile: requiredMobile } = req.body;
   
    try {
      
        // Exclude the password field and store user in the request for the next middleware
        const user = await Clients.find({mobile: requiredMobile}).populate('category_id').select('-password');
      
        if(user[0].category_id.name !== requiredRole){
            return res.status(401).send("Unauthorized");
        }
        req.user = user; // This will allow the user data to be accessed in the next middleware
        next(); // Move to the next middleware or route handler
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
};





module.exports = { verifyRole, verifyAdmin, verifyLoginRole, verifyAdminSupplier, verifyClientRole };

// Usage example
// app.get("/admin/dashboard", verifyRole("admin"), adminController.dashboard);
