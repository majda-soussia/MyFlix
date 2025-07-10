const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  if (mongoose.models.User) {
    return mongoose.models.User;
  }
  const UserSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      firstname: { type: String, required: true, trim: true },
      lastname: { type: String, required: true, trim: true },
      password: { type: String, required: true },
      birthday: { type: Date, required: true },
      gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  UserSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  return User;
};