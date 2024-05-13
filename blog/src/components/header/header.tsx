"use client";

import dayjs from "dayjs";
import styles from "./header.module.css";

interface HeaderProps {
  date?: string;
}

export const Header: React.FC<HeaderProps> = ({ date }) => {
  return (
    <header className={styles.header}>
      {date ?? dayjs().format("dddd, D MMMM YYYY HH:mm")}
    </header>
  );
};
