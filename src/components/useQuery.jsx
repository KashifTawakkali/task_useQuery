import { useState, useEffect } from 'react';

const useQuery = ({ method = 'GET', path, query = {}, options = {} }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch data from API
        const response = await fetch(path, {
          method,
          ...options, 
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; 
    };
  }, [method, path, JSON.stringify(query), JSON.stringify(options)]); 

  return { data, isLoading, error };
};

export default useQuery;
