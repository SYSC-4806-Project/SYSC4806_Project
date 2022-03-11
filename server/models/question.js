const { integerPropType } = require('@mui/utils');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({

    id: {
        type: Number
    },
    question: {
        type: String
    },
    answers: {
        type: String
    },


});
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

