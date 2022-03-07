const _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorUnauthorized,
} = require("../configs/errorMethods");

const service = {
  async query({ keyword, skip = 0, limit = 10 }) {
    const filter = _.isNil(keyword) ? null : { name: new RegExp(`^${keyword}`) };
    const users = await User.find(filter)
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return users;
  },

  async getById(id) {
    const user = await User.findById(id).lean();
    if (!user) {
      throw ErrorBadRequest("user is not exists.");
    }
    return user;
  },

  async update({ id, name, email, phone }) {
    const user = await User.findById(id).lean();
    if (!user) {
      throw ErrorBadRequest("user is not exists.");
    }
    const updateData = _.omitBy(
      {
        name,
        email,
        phone,
      },
      _.isUndefined
    );
    const userUpdated = await User.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    return userUpdated;
  },

  async login({ username, password }) {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      throw ErrorUnauthorized("username or password is invalid.");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw ErrorUnauthorized("username or password is invalid.");
    }
    return user;
  },

  async register({ username, password, name, email, phone }) {
    const user = await User.findOne({ username }).lean();
    if (user) {
      throw ErrorBadRequest("username is exists.");
    }
    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: passwordHashed,
      name,
      email,
      phone,
    });
    return newUser;
  },
};

module.exports = { ...service };
