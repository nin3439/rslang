import axios from 'axios';
import { IPropsUpdate } from 'types';
import { API_URL } from '../config';

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
    `${API_URL}/users/${userId}/aggregatedWords?group=${group}&page=0&wordsPerPage=20&filter=%7B%20%22page%22%3A%20%7B%20%22%24eq%22%3A%20${page}%20%7D%20%7D`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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

export const changeWord = async (
  methodRequest: 'post' | 'put',
  body: IPropsUpdate,
  wordId: string
) => {
  const id = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  return await axios({
    method: methodRequest,
    url: `${API_URL}/users/${id}/words/${wordId}`,
    data: {
      ...body,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
// axios[method](
//   `${API_URL}/users/${id}/words/${wordId}`,
//   { ...body },
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   }
// );
