'use client';

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import questionsData from '@/data/questions.json';

const DRINK_COOLDOWN_HOURS = 12;
const COOLDOWN_MS = DRINK_COOLDOWN_HOURS * 60 * 60 * 1000;

export default function Home() {
    const [activeCard, setActiveCard] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState({ id: null, text: '' });
    const [timeLeft, setTimeLeft] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '' });

    useEffect(() => {
        // Initial check for cooldown and state
        const lastDraw = localStorage.getItem('lastDrawTime');
        const savedCard = localStorage.getItem('activeCard');
        const savedQuestion = localStorage.getItem('currentQuestion');

        if (lastDraw) {
            const lastTime = parseInt(lastDraw, 10);
            const now = Date.now();
            if (now - lastTime < COOLDOWN_MS) {
                const remaining = COOLDOWN_MS - (now - lastTime);
                setTimeLeft(remaining);

                // If we have a saved card and question, restore them
                if (savedCard && savedQuestion) {
                    setActiveCard(savedCard);
                    setCurrentQuestion(JSON.parse(savedQuestion));
                }
            } else {
                // Cooldown expired, clear saved state
                localStorage.removeItem('activeCard');
                localStorage.removeItem('currentQuestion');
            }
        }

        // Timer to update timeLeft every second
        const interval = setInterval(() => {
            const lastDraw = localStorage.getItem('lastDrawTime');
            if (lastDraw) {
                const lastTime = parseInt(lastDraw, 10);
                const now = Date.now();
                if (now - lastTime < COOLDOWN_MS) {
                    setTimeLeft(COOLDOWN_MS - (now - lastTime));
                } else {
                    setTimeLeft(null);
                    // Also clear saved card/question when cooldown expires
                    setActiveCard(null);
                    setCurrentQuestion({ id: null, text: '' });
                    localStorage.removeItem('activeCard');
                    localStorage.removeItem('currentQuestion');
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getRandomQuestion = (type) => {
        const keys = Object.keys(questionsData[type]);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return {
            id: randomKey,
            text: questionsData[type][randomKey]
        };
    };

    const formatTime = (ms) => {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const handleCardClick = (type) => {
        if (activeCard === type) {
            setActiveCard(null);
            return;
        }

        if (activeCard === null) {
            const lastDraw = localStorage.getItem('lastDrawTime');
            const savedCard = localStorage.getItem('activeCard');
            const now = Date.now();

            if (lastDraw) {
                const lastTime = parseInt(lastDraw, 10);
                if (now - lastTime < COOLDOWN_MS) {
                    // If they already have a card from this window, they can re-open it
                    if (savedCard === type) {
                        const savedQuestion = localStorage.getItem('currentQuestion');
                        setActiveCard(type);
                        setCurrentQuestion(JSON.parse(savedQuestion));
                        return;
                    }

                    const remaining = COOLDOWN_MS - (now - lastTime);
                    setModalConfig({
                        isOpen: true,
                        title: 'Patience,',
                        message: `Please wait ${formatTime(remaining)} before drawing a different card.`
                    });
                    return;
                }
            }

            // New draw
            const question = getRandomQuestion(type);
            setCurrentQuestion(question);
            setActiveCard(type);

            // Record draw
            localStorage.setItem('lastDrawTime', now.toString());
            localStorage.setItem('activeCard', type);
            localStorage.setItem('currentQuestion', JSON.stringify(question));
            setTimeLeft(COOLDOWN_MS);
        }
    };

    return (
        <main className="main-container">
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.title}
                message={modalConfig.message}
            />

            {timeLeft && (
                <div className="cooldown-timer">
                    Next draw available in: {formatTime(timeLeft)}
                </div>
            )}
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
