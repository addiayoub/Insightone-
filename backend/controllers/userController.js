const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class _UserController {
  async index(req, res) {
    try {
      const loggedInUserId = req.user._id;
      const users = await User.find({ _id: { $ne: loggedInUserId } }).sort({
        createdAt: -1,
      });
      return res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const { username, password, passwordConfirmation, isAdmin } = req.body;
      if (!username && !password) {
        return res.status(400).json({
          message: {
            usernamePassword:
              "Veuillez fournir un nom d'utilisateur et un mot de passe.",
          },
        });
      }

      if (!username && password) {
        return res.status(400).json({
          message: {
            username: "Veuillez fournir un nom d'utilisateur.",
          },
        });
      }

      if (username && !password) {
        return res.status(400).json({
          message: {
            password: "Veuillez fournir un mot de pass.",
          },
        });
      }

      // Check if the username already in use
      const exists = await User.findOne({ username: username.toLowerCase() });
      if (exists) {
        return res.status(409).json({
          message: {
            username: "Un utilisateur avec ce nom d'utilisateur existe déjà.",
          },
        });
      }

      if (password !== passwordConfirmation) {
        return res.status(400).json({
          message: { password: "Les mots de passes ne s'accords pas !" },
        });
      }
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        isAdmin,
      });

      // Validate user schema
      const validationError = user.validateSync();
      if (validationError) {
        const { errors } = validationError;
        const formattedErrors = {};
        Object.keys(errors).forEach((key) => {
          formattedErrors[key] = errors[key].message;
        });
        return res.status(400).json({ message: formattedErrors });
      }

      // Add the user to DB
      const savedUser = await User.create({
        username: username.toLowerCase(),
        password: hashedPassword,
        isAdmin,
      });

      res.status(201).json({
        message: "Utilisateur créé avec succès.",
        user: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la création de l'utilisateur.",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const exists = await User.findById(id);
    if (!exists) {
      return res.status(409).json({
        message: "Utilisateur non trouvé.",
      });
    }
    await User.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "L'utilisateur a été supprimé avec succès." });
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { username, password, passwordConfirmation, isAdmin } = req.body;
      // return res.json({ username, password, passwordConfirmation, isAdmin });
      const user = await User.findById(id);
      const user2 = await User.findOne({ username });
      if (user2) {
        if (user2.id != user.id) {
          return res.status(400).json({
            message: {
              username:
                "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
            },
          });
        }
      }
      user.username = username.toLowerCase();
      user.isAdmin = isAdmin;
      if (password || passwordConfirmation) {
        if (password !== passwordConfirmation) {
          return res.status(400).json({
            message: { password: "Les mots de passes ne s'accords pas !" },
          });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }
      // Validate user schema
      const validationError = user.validateSync();
      if (validationError) {
        const { errors } = validationError;
        const formattedErrors = {};
        Object.keys(errors).forEach((key) => {
          formattedErrors[key] = errors[key].message;
        });
        return res.status(400).json({ message: formattedErrors });
      }

      user.save();
      res.status(201).send({
        message: "L'utilisateur a été mis à jour avec succès.",
        user,
      });
    } catch {
      res.status(500).json({
        error: "Une erreur s'est produite lors du traitement de la requête.",
      });
    }
  }

  async show(req, res) {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const { id } = req.params;
      const { username, password, passwordConfirmation } = req.body;
      const user = await User.findById(id);
      let newInfos = { username };
      const exists = await User.findOne({ username, _id: { $ne: id } });

      if (exists) {
        return res.status(400).json({
          message: {
            username:
              "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
          },
        });
      }
      user.username = username.toLowerCase();

      if (password || passwordConfirmation) {
        if (password !== passwordConfirmation) {
          return res.status(400).json({
            message: { password: "Les mots de passes ne s'accords pas !" },
          });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        newInfos.password = hashedPassword;
      }

      // Validate user schema
      const validationError = user.validateSync();
      if (validationError) {
        const { errors } = validationError;
        const formattedErrors = {};
        Object.keys(errors).forEach((key) => {
          formattedErrors[key] = errors[key].message;
        });
        return res.status(400).json({ message: formattedErrors });
      }

      const newUser = await User.findByIdAndUpdate(
        id,
        { $set: newInfos },
        { new: true }
      );
      res.status(201).send({
        message: "Vos informations ont été mises à jour avec succès",
        newUser,
      });
    } catch {
      res.status(500).json({
        error: "Une erreur s'est produite lors du traitement de la requête.",
      });
    }
  }

  async deleteAll(req, res) {
    try {
      await User.deleteMany({});
      res.json({ message: "done" });
    } catch (error) {
      res.json({ error });
    }
  }

  async savePortefeuille(req, res) {
    try {
      const { id, portefeuille } = req.body;

      // Find the user
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }

      // Initialize portefeuilles as an array if it's undefined
      user.portefeuilles = user.portefeuilles || [];

      // Check if the portefeuille name already exists
      const isPortefeuilleNameExists = user.portefeuilles.find(
        (existing) =>
          existing.name === portefeuille.name &&
          existing.type === portefeuille.type
      );

      if (isPortefeuilleNameExists) {
        return res.status(400).json({
          message:
            "Le titre du portefeuille existe déjà. Veuillez choisir un autre titre.",
        });
      }

      // Add the new portefeuille to the user's portefeuilles array
      user.portefeuilles.push(portefeuille);
      // Save the updated user to the database
      await user.save();

      res
        .status(201)
        .json({ message: "Portefeuille enregistré avec succès.", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
}

const userController = new _UserController();
module.exports = userController;
