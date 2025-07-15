import React from 'react';
import { useParams } from 'react-router-dom';
const Redirector = () => {
  const { code } = useParams();

  React.useEffect(() => {
    const clickID = `redirect_${code}_${Date.now()}`;
    console.log("Redirecting using code:", code);
    window.location.href = `http://localhost:3001/r/${code}`;
  }, [code]);

  return <p>Redirecting...</p>;
};
export default Redirector;

