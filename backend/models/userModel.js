const mongoose = require("mongoose");

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [
        5,
        "Le nom d'utilisateur doit comporter au moins 5 caractères.",
      ],
      required: [true, "le nom d'utilisateur est obligatoire !"],
      // unique: [
      //   true,
      //   "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
      // ],
      trim: true,
      match: [usernameRegex, "nom d'utilisateur invalide"],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire !"],
      select: false,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    pic: {
      type: String,
      default: "default-profile.jpg",
    },
    loginHistory: [{ type: Date, default: Date.now }],
    portefeuilles: [
      {
        name: {
          type: String,
        },
        field: {
          type: String,
        },
        type: {
          type: String,
        },
        data: {
          type: Array,
          default: [],
        },
        params: {
          type: Object,
          default: {},
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.index(
  { username: 1 },
  {
    unique: [
      true,
      "Ce nom d'utilisateur est déjà pris. Veuillez en choisir un autre.",
    ],

    partialFilterExpression: {
      isDeleted: false,
    },
  }
);
userSchema.pre("find", function () {
  this.where({ isDeleted: false });
});
userSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

const User = mongoose.model("user", userSchema);

module.exports = User;
