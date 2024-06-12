import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const HealthQnAPage = () => {
    // Sample health Q&A data
    const [healthQnA, setHealthQnA] = useState([
        { question: "What is a balanced diet?", answer: "A balanced diet includes a variety of foods from all food groups, such as fruits, vegetables, grains, protein, and dairy, in appropriate portions." },
        { question: "How much water should I drink per day?", answer: "It is recommended to drink at least 8 glasses (about 2 liters) of water per day for adults, but individual needs may vary depending on factors like activity level, climate, and health conditions." },
        { question: "What are the benefits of regular exercise?", answer: "Regular exercise has numerous benefits, including improved cardiovascular health, weight management, increased muscle strength, better mood, and reduced risk of chronic diseases like diabetes and heart disease." },
        { question: "What are the symptoms of the common cold?", answer: "Common symptoms of the cold include a runny or stuffy nose, sore throat, cough, sneezing, mild body aches, and mild fatigue." },
        { question: "How can I boost my immune system?", answer: "To boost your immune system, focus on maintaining a healthy lifestyle by eating a balanced diet, getting regular exercise, managing stress, getting enough sleep, and avoiding smoking and excessive alcohol consumption." },
        { question: "What are some ways to reduce stress?", answer: "Some ways to reduce stress include practicing relaxation techniques such as deep breathing and meditation, engaging in physical activity, spending time with loved ones, and seeking support from a counselor or therapist if needed." },
        { question: "How can I improve my sleep quality?", answer: "To improve sleep quality, establish a regular sleep schedule, create a relaxing bedtime routine, make your sleep environment comfortable and conducive to sleep, limit caffeine and alcohol intake, and manage stress effectively." },
        { question: "What is the best way to lose weight?", answer: "The best way to lose weight is to adopt a balanced diet that is low in calories but high in nutrients, engage in regular physical activity, and make sustainable lifestyle changes rather than resorting to fad diets or extreme measures." },
        { question: "What are the benefits of quitting smoking?", answer: "Quitting smoking has numerous health benefits, including reduced risk of heart disease, lung cancer, and other smoking-related diseases, improved lung function, better circulation, and increased life expectancy." },
        { question: "How often should I get a check-up with my doctor?", answer: "It is recommended to have a regular check-up with your doctor at least once a year, even if you're feeling healthy. Your doctor can assess your overall health, screen for potential health issues, and provide guidance on preventive care and healthy lifestyle habits." }
    ]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <Helmet>
                    <title>Medi House 🩺 | Health Q&A</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Health Questions & Answers</h1>
                <ul className="space-y-6">
                    {healthQnA.map((item, index) => (
                        <li key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-2">{item.question}</h2>
                            <p className="text-gray-700">{item.answer}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HealthQnAPage;
