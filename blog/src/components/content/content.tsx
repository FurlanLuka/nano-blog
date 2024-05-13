import { PropsWithChildren } from "react";
import styles from "./content.module.css";

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
