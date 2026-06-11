import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const analyzeScenario = async (usage: string, scenario: string) => {
  const response = await axios.post(`${API_URL}/analyze`, {
    usage,
    scenario
  });

  return response.data;
};
