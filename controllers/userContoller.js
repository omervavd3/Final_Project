const UserModel = require("../models/userModel");

exports.addUser = async(req,res) => {
    try {
        const { name, email, password } = req.body;
        const findUser = await UserModel.findOne({name:name});
        if(findUser) {
          res.status(200).send({ isExits: true, isCreated: false });
        } else {
          const crypto = require('crypto');
          function hashPassword(password) {
            // Create a SHA-256 hash of the password
            const hash = crypto.createHash('sha256');
            hash.update(password);
            return hash.digest('hex'); // Return the hash as a hexadecimal string
          }
          const newPas = await hashPassword(password)
          const userDB = await UserModel.create({ name, email, password: newPas});
      
          console.log(userDB);
          
          res.status(201).send({ isExits: false, isCreated: true });
        }
      } catch (error) {
          console.error(error);
          res.status(500).send({ error: error.messeage });
      }
}

exports.logIn = async(req,res) => {
  try {
    const { name, password } = req.body;
    const crypto = require('crypto');
    function hashPassword(password) {
      // Create a SHA-256 hash of the password
      const hash = crypto.createHash('sha256');
      hash.update(password);
      return hash.digest('hex'); // Return the hash as a hexadecimal string
    }
    const newPas = await hashPassword(password)
    const userDB = await UserModel.findOne({name:name, password:newPas})
    //checks if admin
    const adminPass = hashPassword(process.env.ADMIN_PASSWORD);
    if(userDB) {
      if(userDB.name == process.env.ADMIN_NAME && userDB.password == adminPass) {
        res.clearCookie('user')
        res.cookie('userAdmin', userDB._id, { maxAge: 50000000, httpOnly: true });
        res.status(200).send({ message: "Found", admin: true, user:userDB})
      } else {
        res.cookie('user', userDB._id, { maxAge: 50000000, httpOnly: true });
        res.status(200).send({ message: "Found", admin: false, user:userDB})
      }
    } else {
        res.status(200).send({message: "Not found"})
    }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.getUserById = async(req,res) => {
  try {
    const { _id} = req.body;
    const userDB = await UserModel.findOne({_id:_id})
    if(userDB) {
      res.status(200).send({isFound:true, user:userDB})
    } else {
      res.status(200).send({isFound:false, user:undefined})
    }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.isLoggedIn = async(req,res) => {
  try {
    const userIdCookie = req.cookies['user'];
    const userDB = await UserModel.findOne({_id:userIdCookie})
    if(userDB) {
      res.status(200).send({isFound:true, user:userDB})
    } else {
      res.status(200).send({isFound:false, user:undefined})
    }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.logOut = async(req,res) => {
  try {
    res.clearCookie('user')
    res.clearCookie('userAdmin')
    res.status(200).send({isLoggedOut:true})
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}

exports.isAdminLoggedIn = async(req,res) => {
  try {
    const userId = req.cookies['userAdmin']
    if(userId == process.env.ADMIN_ID) {
      res.status(200).send({isAdminLoggedIn:true})
    } else {
      res.status(200).send({isAdminLoggedIn:false})
    }
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.messeage });
  }
}