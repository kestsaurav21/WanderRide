

const adminMiddleware = async (req, res, next) => {

    console.log(req);
    

    try {
        if(req.user.role !== "admin" ){
            res.status(403).json({
                success: false,
                message: "Access denied! Admins only."
            })
        }
        next(); // user is admin -> continue
        
    } catch (error) {
        res.status(500).json({
      success: false,
      message: "Server error in admin middleware",
        });
        
    }

}

module.exports = adminMiddleware;