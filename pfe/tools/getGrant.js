/**
 * @param {('Admin'|'Teacher'|'Student'|'agent')[]} allowedRoles
 */
exports.getGrant = (allowedRoles)=>{
    /**
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    return (req, res, next) => {
        if(req.session.user && allowedRoles.includes(req.session.user.role)) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    }
}