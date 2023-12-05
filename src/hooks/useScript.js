import { useEffect, useState } from "react";

/**
 * @param {*} url
 * A-Frame:warn Put the A-Frame <script> tag in the <head> of the HTML *before* the scene to ensure everything 
 * for A-Frame is properly registered before they are used from HTML.  
 */

const useScript = (url) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('inside use effect.............')
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    script.onload = () => {
      setLoading(false);
    };

    script.onerror = () => {
      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url, loading]);

  return {
    loading
  }
};

export default useScript;
