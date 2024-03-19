const User = require("../models/userModel");

class _ApiLogController {
  async store(req, res) {
    try {
      // Extract relevant information from the request
      const { baseURL, method, url, status, executionTime, type } = req.body;
      const user = await User.findById(req.user._id);
      console.log(req.body, parseFloat(executionTime.toFixed(2)));

      // Create API log entry for the current user
      user.apiLogs.push({
        baseURL,
        method,
        url,
        status,
        executionTime: parseFloat(executionTime.toFixed(2)),
        type,
      });

      // Save the API log entry to the database
      await user.save();

      // Respond with success message
      res.status(201).json({ message: "API log stored successfully" });
    } catch (error) {
      // Handle errors
      console.error("Error storing API log:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
const apiLogController = new _ApiLogController();
module.exports = apiLogController;
