import { BASE_URL } from '../config';

export const gamesApi = {
  // later convert this url to infinite scrolling
  fetchAllGames: ({ pageParam = 1 }) =>
    fetch(`${BASE_URL}webapi/v1/api/getfilm.php`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + base64.encode(user + ":" + pass),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterby: [{ tahun: "" }, { gere: "" }],
          Sortby: [{ 1: "" }],
          limit: 20,
          page: pageCurrent,
        }),
      }).then(res => {
      return res.json();
    })
};