"use client";

import styles from "./footer.module.css";

interface FooterProps {
  actionButtons: {
    shortcut: string;
    text: string;
    onAction: () => void;
  }[];
}

export const Footer: React.FC<FooterProps> = ({ actionButtons }) => {
  return (
    <footer className={styles.footer}>
      {actionButtons.map((actionButton) => (
        <div className={styles.actionButton} onClick={actionButton.onAction}>
          <div className={styles.shortcut}>^{actionButton.shortcut}</div>
          <div className={styles.text}>{actionButton.text}</div>
        </div>
      ))}
    </footer>
  );
};
