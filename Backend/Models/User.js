const { Schema } = require("mongoose");

module.exports = (mongoose) => {
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
        enum: ["male", "female", "other"],
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
  const User = mongoose.model("User", UserSchema);
  return User;
};
