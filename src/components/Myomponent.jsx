import React, { useEffect, useState } from 'react';

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
          path: 'https://bayut-org-testing.mini91.com/',
          // query: { key: 'value' },
          options: {
            headers: {
              Authorization: ``,
              'Content-Type': 'application/json',
            },
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
