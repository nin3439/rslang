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
export const uploadAuthWords = async (
  userId: string,
  group: string,
  page: string
) => {
  const token = localStorage.getItem('token');
  return await axios.get(
    `${API_URL}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${20}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: { group, page },
    }
  );
};
// await fetch(`${API_URL}/users/${userId}/aggregatedWords?group=${group}&page=${page}`, {
//   method: 'PUT',
//   headers: {
//     Authorization: `Bearer ${token}`,
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

export const changeWord = async (body: IUpdateWord, wordId: string) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  return await axios.post(
    `${API_URL}/users/${userId}/words/${wordId}`,
    { ...body },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};
