import styles from './Card.module.css';

const Card = ({ type, question, isFlipped, onClick }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
  const coverImage = `${basePath}/Images/${typeCapitalized} Back.png`;
  const faceImage = `${basePath}/Images/${typeCapitalized} Front.png`;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={`${styles.cardInner} ${isFlipped ? styles.isFlipped : ''}`}>
        {/* Front of Card (Cover) - Face Down */}
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <img
            src={coverImage}
            alt={`${type} Card Cover`}
            className={styles.cardImage}
          />
        </div>

        {/* Back of Card (Question) - Face Up */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          {/* Background Image */}
          <img
            src={faceImage}
            alt={`${type} Card Face`}
            className={styles.cardImage}
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          />

          {/* Content Overlay */}
          <div className={styles.cardContentOverlay} style={{ zIndex: 2 }}>
            <div className={styles.cardTextContainer}>
              <h2 className={styles.cardText}>
                {question?.text}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
