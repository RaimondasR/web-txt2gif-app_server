const webappUserDb = require("../models/userSchema");
const webappTextDb = require("../models/textSchema");

module.exports = {
    validateUserRegister: async (req, res, next) => {
        const {userName, password1, password2} = req.body;

        const userExists = await webappUserDb.findOne({userName});
        if (userExists) {
            return res.send({success: false, message: "error: username is already taken"})
        }
        if(userName.length > 20 || userName.length < 3) {
            return res.send({success: false, message: "error: bad username"});
        }
        if(password1 !== password2 || password1.length > 20 || password1.length < 3) {
            return res.send({success: false, message: "error: bad password"});
        }
        next();
    },
    validateUserImage: async (req, res, next) => {
      const {userImage} = req.body;

      if (userImage.length === 0) {
        return next();
      }

      if (userImage.length > 0) {
        if (userImage.includes("jpeg") || userImage.includes("jpg") || userImage.includes("gif") || userImage.includes("png")) {
        return next();
        }
        res.send({success: false, message: "error: bad image file format"})
      }
    },
    validateIfUserLoggedIn: async (req, res, next) => {
        const {userName} = req.session;
        if (userName) return next();
        res.send({success: false, message: "error: please sign in"})
    },
    validateText: async (req, res, next) => {
        const { textEntered } = req.body;
        
        if (textEntered.length < 2 || textEntered.length > 400) {
            return res.send({success: false, message: "error: entered text length should be 2-400 characters"});
        }
        next();
    },
}