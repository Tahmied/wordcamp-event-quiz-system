import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import Question from '../Models/question.model.js';

dotenv.config('./.env')

const seedDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://tahmiedhossain:tahmied@wordcamp.c9lgnpn.mongodb.net/wordcamp`);
        console.log('Database connected for seeding...');
        await Question.deleteMany({});
        console.log('Old questions removed.');
        const questions = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));
        await Question.insertMany(questions);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();