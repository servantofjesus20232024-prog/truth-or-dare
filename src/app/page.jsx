'use client';

import React, { useState } from 'react';
import Card from '@/components/Card';
import questionsData from '@/data/questions.json';

export default function Home() {
    const [activeCard, setActiveCard] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState({ id: null, text: '' });

    const getRandomQuestion = (type) => {
        const keys = Object.keys(questionsData[type]);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return {
            id: randomKey,
            text: questionsData[type][randomKey]
        };
    };

    const handleCardClick = (type) => {
        if (activeCard === type) {
            // If clicking the active card, reset
            setActiveCard(null);
            setCurrentQuestion({ id: null, text: '' });
        } else if (activeCard === null) {
            // Pick a random question and flip
            const question = getRandomQuestion(type);
            setCurrentQuestion(question);
            setActiveCard(type);
        }
    };

    return (
        <main className="main-container">
            <div className="cards-wrapper">
                <div className={`card-wrapper-item ${activeCard === 'dare' ? 'card-inactive' : ''}`}>
                    <Card
                        type="truth"
                        question={activeCard === 'truth' ? currentQuestion : null}
                        isFlipped={activeCard === 'truth'}
                        onClick={() => handleCardClick('truth')}
                    />
                </div>

                <div className={`card-wrapper-item ${activeCard === 'truth' ? 'card-inactive' : ''}`}>
                    <Card
                        type="dare"
                        question={activeCard === 'dare' ? currentQuestion : null}
                        isFlipped={activeCard === 'dare'}
                        onClick={() => handleCardClick('dare')}
                    />
                </div>
            </div>
        </main>
    );
}
