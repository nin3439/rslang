import axios from 'axios';
import { API_URL } from '../config';

const getWords = async (groupNumber, pageNumber) => {
  try {
    const res = await axios.get(`${API_URL}/words`, {
      params: { group: groupNumber, page: pageNumber },
    });
    localStorage.setItem(
      `words_${groupNumber}_${pageNumber}`,
      JSON.stringify(res.data)
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export default getWords;
