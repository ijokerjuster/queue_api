const passport = require("passport");
const jwt = require('jsonwebtoken');
const userService = require("../services/user.service");
const fileService = require("../services/file.service");
const { secret } = require('../configs/app');
const userSerializer = require('../serializers/user');

const controller = {
  async query(req, res) {
    try {
      req.validate();
      const users = await userService.query(req.query);
      const userSerialized = userSerializer.serialize(users);
      res.success(userSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async getById(req, res) {
    try {
      const {id} = req.params;
      const user = await userService.getById(id);
      const userSerialized = userSerializer.serialize([user]);
      res.success(userSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async update(req, res) {
    try {
      req.validate();
      const id = req.user._id.toString();
      let imagePath;
      if(req.file){
        imagePath = await fileService.upload(req.file);
      }
      const user = await userService.update({...req.body, id, imagePath});
      const userSerialized = userSerializer.serialize([user]);
      res.success(userSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  async changePassword(req, res) {
    try {
      req.validate();
      const id = req.user._id.toString();
      const user = await userService.changePassword({...req.body, id});
      const userSerialized = userSerializer.serialize([user]);
      res.success(userSerialized);
    } catch (error) {
      res.error(error);
    }
  },

  login(req, res, next) {
    try {
      req.validate();
      passport.authenticate("local", (err, user) => {
        if (err) {
          res.error(err);
        }
        const userSerialized = userSerializer.serialize([user]);
        const token = jwt.sign({id: userSerialized.users[0].id}, secret);
        res.cookie('token', token, { maxAge: 1000 * 60 * 60, httpOnly: true });
        res.success({...userSerialized, token});
      })(req, res, next);
    } catch (error) {
      res.error(error);
    }
  },

  logout(req, res) {
    res.cookie('token', null, { maxAge: 1, httpOnly: true });
    res.success({users: null});
  },

  auth(req, res) {
    const userSerialized = userSerializer.serialize([req.user]);
    res.success({...userSerialized});
  },

  async register(req, res) {
    try {
      req.validate();
      let imagePath;
      if(req.file){
        imagePath = await fileService.upload(req.file);
      }
      const user = await userService.register({...req.body, imagePath});
      const userSerialized = userSerializer.serialize([user]);
      res.success(userSerialized);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...controller };
