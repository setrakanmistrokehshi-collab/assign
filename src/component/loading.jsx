import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
   const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return() => clearTimeout(timer)
  }, []);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {/* Your other content */}
      <h1>My App</h1>
    </div>
  );
}

export default App;