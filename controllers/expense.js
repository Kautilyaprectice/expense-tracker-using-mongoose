const mongoose = require('mongoose');
const Expense = require('../modles/expense');
const User = require('../modles/user');

exports.getAllExpenses = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const count = await Expense.countDocuments({ userId: req.user._id });
        const expenses = await Expense.find({ userId: req.user._id })
            .limit(limit)
            .skip((page - 1) * limit);
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            expenses: expenses
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createExpense = async (req, res, next) => {
    const { amount, description, category } = req.body;
    const userId = req.user._id;

    try {

        const newExpense = new Expense({ amount, description, category, userId });
        await newExpense.save();

        const existingUser = await User.findById(userId);
        if (existingUser) {
            existingUser.total += parseInt(amount);
            await existingUser.save(); 
        }
        else{
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {

        const expenseId = req.params.id;
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const expenseAmount = expense.amount;

        const user = await User.findById(expense.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.total -= expenseAmount;

        await user.save();
        await Expense.findByIdAndDelete(expenseId);

        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.error('Error deleting expense:', err);
        res.status(500).json({ error: err.message });
    }
};