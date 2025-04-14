const User = require('../model/userModel'); // On importe le modèle User
const bcrypt = require('bcrypt');

exports.login = async (req,res,next) => {
    const { password, email, matricule } = req.body;

// <input type="email" id="email"       name="email" class="form-input" placeholder="votrenom@gmail.com">
// <input type="text" id="matricule"    name="matricule" class="form-input" placeholder="ex: 20230001"></input>

    if(!password || (!email && !matricule)){
        return res.status(400).json({
            status: "fail",
            message:"Missing credentials",
        })
    }

    /**
     * @type {{
     * id: number;
     * nom: string;
     * prenom: string;
     * email: string;
     * motdepasse: string;
     * role: 'Admin'|'Teacher'|'Student'|'agent';
     * }}
     */
    // @ts-ignore
    const user = await User.findOne({
        where: !!email ? { email: email } : { matricule: matricule },
      });
      
      if (user && bcrypt.compareSync(password, user.motdepasse)) {
        req.session.user = user;

        return res.status(200).json({
            status: "success",
            data: {
                id: user.id,
            }
        });
      }

    res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
    });
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
exports.currentUser = async (req,res,next) => {
    const {motdepasse, ...data} = req.session.user;

    res.status(200).json({
        status: "success",
        data,
    });
}

exports.logout = (req,res,next) => {
    req.session.destroy();

    res.status(200).json({
        status: "success",
    });
}

const regiser = (req,res,next) => {
    /*
    DATA :
    - student et user
    - teacher et user
    
    res.status(200).json({
        status: "success",
    });
    */
   // INSERT INTO user > user_id
   // INSERT INTO student < user_id
   // INSERT INTO teacher < user_id
}