import axios from 'axios';

const URL = 'https://pixabay.com/api/';

export default async function getImage(query, page) {
  try {
    const resp = await axios.get(URL, {
      params: {
        key: '44688372-c4a6370de5fd27ba7998065cb',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '40',
        page: page,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
}
