const mongoose = require('mongoose');

const TodosSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

TodosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TodosSchema.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('Todos', TodosSchema);