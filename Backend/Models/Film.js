const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const FilmSchema = new Schema(
    {
      title: { type: String, required: true, trim: true },
      image: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      rate: { type: Number, required: true, min: 0, max: 10 },
      genres: {
        type: [String],
        enum: ["Action", "Aventure", "Animation", "Comédie", "Crime", "Documentaire", "Drame", "Famille", "Fantastique", "Histoire", "Horreur", "Musique", "Mystère", "Romance", "Science-Fiction", "Téléfilm", "Thriller", "Guerre", "Western"],
        required: true,
      },
      releaseDate: { type: Date, required: true },
    },
    {
      timestamps: true,
    }
  );

  FilmSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Film = mongoose.models.Film || mongoose.model("Film", FilmSchema);
  return Film;
};
