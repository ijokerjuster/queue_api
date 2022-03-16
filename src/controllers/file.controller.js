const fileService = require("../services/file.service");

const controller = {
  async upload(req, res) {
    try {
    const response = await fileService.upload(req.file);
    res.success(response);
    } catch (error) {
      res.error(error);
    }
  },
};

module.exports = { ...controller };
