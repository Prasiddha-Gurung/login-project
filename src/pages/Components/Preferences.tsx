import router from 'next/router';
import { useState, useEffect } from 'react';

const Preferences = () => {
  const [cookieValue, setCookieValue] = useState(false);
  useEffect(() => {
    if (getCookieValue('loginToken')) {
      setCookieValue(true);
    }
  }, []);

  const getCookieValue = (name: string) => {
    if (typeof document === 'undefined') {
      return undefined;
    }
    const value = document.cookie;
    if (value.includes(name)) {
      return true;
    }
    return false;
  };

  if (!cookieValue) {
    if (typeof document === 'undefined') {
      return undefined;
    }
      return <div>Please Login</div>
  }

  return <div>This content is only shown if the cookie is present.</div>;
};

export default Preferences;
