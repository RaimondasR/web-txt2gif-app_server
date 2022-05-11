const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const webappUserDb = require("../models/userSchema");
const webappTextDb = require("../models/textSchema");

module.exports = {
    userRegister: async (req, res) => {
        const {userName, password1, userImage} = req.body;
        const userExists = await webappUserDb.findOne({userName});

        if (userExists) return res.send({success: false, message: "error: username is already taken"});

        const hashPassword = await bcrypt.hash(password1, saltRounds);
        const user = new webappUserDb();
        
        user.userId = uuidv4();
        user.userName = userName
        user.password = hashPassword
        user.registrationDate = Date.now();
        if (userImage.lenght > 0) {
          user.userImage = userImage
        }
        await user.save();
        res.send({success: true, message: "success: new user registered"});
    },
    userLogin: async (req, res) => {
        const { userName, password } = req.body;
        const userExists = await webappUserDb.findOne({userName});

        if (!userExists) return res.send({success: false, message: "error: bad username or password"});
        if (userExists) {
          const passwordsMatch = await bcrypt.compare(password, userExists.password);
          if(passwordsMatch) {
            req.session.userName = userName;
            const user = await webappUserDb.findOne({userName}, {userName: true});
            return res.send({success: true, message: "success: user logged-in", user}); 
          }  
        }
    },
    enterText: async (req, res) => {
      const { textEntered } = req.body;
      const { userName } = req.session;
      const text = new webappTextDb();
      let id = uuidv4();
      text.textId = id;
      text.textAuthor = userName;
      text.textEntered = textEntered,
      text.textCreationDate = Date.now();
      text.save();
      const user = await webappUserDb.findOne({userName});
      await webappUserDb.findOneAndUpdate({userName}, {$set: {textsCount: user.textsCount + 1}});
      res.send({success: true, message: "success: new text submitted to IBM Watson NLS", id});
    }
  }
