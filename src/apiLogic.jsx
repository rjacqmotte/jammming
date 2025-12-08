// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  'BQBS2-M9tbUDdN2sdW4vlAnPAno_HO4nR3-aC1g2HUxqJ7WtZIbnnkpc8hkHNXAUG5u_0NI5Armft5rW9YPWSNxU4z3uWET4gvlJbkMawrR3yGJ8RXZ3vlMW1hJvIEziSge0v40nhig';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')
  ).items;
}

async function showTopTracks() {
  const topTracks = await getTopTracks();
  console.log(
    topTracks?.map(
      ({ name, artists }) =>
        `${name} by ${artists.map((artist) => artist.name).join(', ')}`
    )
  );
}

export default showTopTracks;

/*
{"access_token":"BQBS2-M9tbUDdN2sdW4vlAnPAno_HO4nR3-aC1g2HUxqJ7WtZIbnnkpc8hkHNXAUG5u_0NI5Armft5rW9YPWSNxU4z3uWET4gvlJbkMawrR3yGJ8RXZ3vlMW1hJvIEziSge0v40nhig","token_type":"Bearer","expires_in":3600}renaud@pop-os:~/Git projects/jammming$ 
*/
