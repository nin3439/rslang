import axios from 'axios';
import { API_URL } from '../config';
import { IUpdateWord } from '../types';

export const getWords = async (groupNumber: number, pageNumber: number) => {
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

export const uploadWords = async (group: string, page: string) => {
  return await axios.get(`${API_URL}/words`, {
    params: { group, page },
  });
};

export const changeWord = async (body: IUpdateWord, wordId: string) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  return await axios.put(`${API_URL}/users/${userId}/words/${wordId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
