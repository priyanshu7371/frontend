import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterApp = () => {
    localStorage.setItem('enteredApp', 'true');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Achieve More. Stress Less.</h1>
          <p className={styles.subtitle}>
            Solo Grind is the modern, gamified productivity app designed to help you conquer your goals, one quest at a time.
          </p>
          <button onClick={handleEnterApp} className={styles.ctaButton}>
            Enter App
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Everything You Need to Level Up</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Daily Quests</h3>
            <p>Turn your to-do list into an exciting adventure. Set daily, weekly, or long-term goals and track them with ease.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Progress Tracking</h3>
            <p>Visualize your journey with insightful statistics, streaks, and beautiful charts. See how far you've come.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏆</div>
            <h3>Gamified Rewards</h3>
            <p>Stay motivated by unlocking achievements and earning rewards for your consistency and hard work.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.sectionTitle}>Ready to Start Your Journey?</h2>
          <p className={styles.subtitle}>
            Join thousands of others who are turning their ambitions into achievements.
          </p>
          <button onClick={handleEnterApp} className={styles.ctaButton}>
            Enter App
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Solo Grind. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;