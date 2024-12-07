const fetchWithHeaders = async (url, method = 'GET', body = null, token = '', apiKey = '') => {
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  
    const options = {
      method,
      headers,
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // Parse and return JSON response
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Rethrow to handle in calling code
    }
  };
  