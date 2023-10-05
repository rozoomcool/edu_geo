const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      text: {
        type: String,
        required: true,
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;