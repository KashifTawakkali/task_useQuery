// fetchData.js
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
  
  export default fetchData;
  