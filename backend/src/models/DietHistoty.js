const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        require: true
    },
    personalData: {
        age: { type: Number, required: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        gender: { type: String, required: true },
        phyAct: { type: Number, required: true },
        goal: { type: String, required: true },
        meals_per_day: { type: Number, required: true },
        wStatus: { type: String, required: true },
        bmi: { type: Number, required: true },
        bmr: { type: Number, required: true },
        required_calories: { type: Number, required: true }
    },
    selectedMeals: [[{ type: String, required: true }, { type: Number, required: true }, { type: Number, required: true }, { type: Number, required: true }, { type: Number, required: true }]]
}, { timestamps: true });

// we are creating model named Register based on userSchema and stored model in Register variable
const DietHistory = new mongoose.model("MealHistory", historySchema);
module.exports = DietHistory;