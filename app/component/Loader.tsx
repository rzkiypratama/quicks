import React from "react";
import styles from "../../public/styles/Loader.module.css";

interface LoadingIndicatorProps {
  loadingText: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loadingText }) => (
  <div className={`flex flex-col ${styles["loader-container"]}`}>
    <div className={styles.spinner}></div>
    <p className="mt-3">{loadingText}</p>
  </div>
);

export default LoadingIndicator;
