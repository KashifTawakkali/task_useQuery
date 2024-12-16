// import { useState, useEffect } from 'react';

// const useQuery = (endpoint) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(endpoint);
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.statusText}`);
//         }
//         const result = await response.json();

//         if (isMounted) {
//           setData(result);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err.message);
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//     };
//   }, [endpoint]);

//   return { data, isLoading, error };
// };

// export default useQuery;




const fetchData = async ({ method = 'GET', path, query = {}, options = {}, skip = false }) => {
    if (skip) {
      return null; 
    }
  
    const queryString = new URLSearchParams(query).toString();
    const url = queryString ? `${path}?${queryString}` : path;
  
    try {
      const response = await fetch(url, {
        method,
        ...options,
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error.message);
      throw error;
    }
  };
  