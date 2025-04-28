/**
 * Simulates an API response with mock data
 * @param data The data to return
 * @returns A promise resolving to the data after a short delay
 */
export const mockData = async <T>(data: T): Promise<T> => {
  // Simulate network delay
  const delay = Math.random() * 500 + 200; // 200-700ms
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Clone the data to simulate a fresh response
  return structuredClone(data);
}; 