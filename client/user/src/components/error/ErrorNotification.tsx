import React, { useEffect, useState } from "react";
import styles from "./Error.module.css";

interface Props {
  error: { err: boolean; message: string };
}

function ErrorNotification({ error }: Props) {
  const { err, message } = error;
  const [showErr, setShowErr] = useState(false);

  useEffect(() => {
    if (err) {
      setShowErr(true);
    }
    const offErrNotification = () => {
      setShowErr(false);
    };

    const timeoutId = setTimeout(offErrNotification, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [err]);

  return <>{showErr ? <pre id={styles.error}>{message}</pre> : null}</>;
}

export default ErrorNotification;
