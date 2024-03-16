class _ApiLogController {
  async index(req, res) {
    try {
      const loggedInUserId = req.user;
      return res.status(200).json({ users: loggedInUserId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const apiLogController = new _ApiLogController();
module.exports = apiLogController;
