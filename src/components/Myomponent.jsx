import React, { useState, useEffect } from 'react';
import fetchData from './useQuery';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        setLoading(true);
        const result = await fetchData({
          method: 'GET',
          path: 'https://enquiry-management-vista-enquiry-api.yn6km5.easypanel.host/api/enquiries?p=0&n=8&s=&k=&a=&ws=',
          query: {},
          options: {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDYzMTg3NTRkYTg3NmM2YTUxNTc4MyIsImlzU3VwZXJBZG1pbiI6dHJ1ZSwiaWF0IjoxNzM0MzQzNTY1LCJleHAiOjE3MzQ0Mjk5NjV9.kar7rFjI0GTqSQ65xnOaajGhZZtNTFvuefTsK0GquQI`,
              'Content-Type': 'application/json',
            }
            
          },
        });
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
