import { calculateMD5 } from '../utilities/crypto';

/* --- API --- */
// --- LAST.FM AUTHENTICATION FLOW ---
// Créer une session Last.fm avec le token reçu
export async function createLastfmSession(token, apiKey, secret, apiUrl) {
  try {
    // Construire la string à hasher (paramètres en ordre alphabétique + secret)
    const stringToHash = `api_key${apiKey}methodauth.getSessiontoken${token}${secret}`;
    const apiSignature = calculateMD5(stringToHash);
    console.log('Signature créée:', apiSignature);

    // Envoyer la requête à Last.fm pour créer la session
    const response = await fetch(
      `${apiUrl}?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSignature}&format=json`
    );
    const sessionData = await response.json();

    if (sessionData.error) {
      console.error('Erreur Last.fm:', sessionData.message);
      return false;
    }

    if (sessionData.session?.key) {
      console.log('Session créée avec succès!');
      console.log('Session key:', sessionData.session.key);
      console.log('Username:', sessionData.session.name);

      // Sauvegarder la clé de session pour les appels futurs
      localStorage.setItem('lastfm_session_key', sessionData.session.key);
      localStorage.setItem('lastfm_username', sessionData.session.name);
      return true;
    }
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
  }
}

// redirige vers le site de last fm pour valider la connection client.
export function connectToLastfm() {
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const callbackUrl = encodeURIComponent('http://localhost:5173/callback');

  console.log('request to connect to Lastfm. redirect to lastfm');
  window.location.href = `http://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackUrl}`;
}

// --- API : SEARCH ---
// appel API pour fournir une liste de tracks sur base de la valeur de la demande utilisateur
export async function requestSearchTracks(searchValue) {
  // construction de l'url
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const apiURL = 'https://ws.audioscrobbler.com/2.0/';
  const urlToFetch = `${apiURL}?method=track.search&track=${encodeURIComponent(searchValue)}&api_key=${apiKey}&format=json`;

  try {
    // GET request

    // Etape 1: Objet response natif
    // envoie de la requête
    console.log('requête de recherche envoyée à API lastFM');
    console.log(`url envoyée: ${urlToFetch}`);
    const response = await fetch(urlToFetch);
    console.log('réponse du search recue:');
    console.log(response);

    // Etape 2: vérifier le HTTP (réseau, serveur, etc.)
    if (!response.ok) {
      throw new Error(
        `Erreur réseau: ${response.status} - ${response.statusText}`
      );
    }

    // Etape 3: Parser le JSON => objet normal JS
    // récupération des données
    const searchData = await response.json();
    console.log('réponse du search parsée:');
    console.log(searchData);

    // Etape 4: vérifier la logique last.FM
    if (searchData.error) {
      throw new Error(`Last.fm : ${searchData.error} - ${searchData.message}`);
    }

    // Etape 5: Succés!
    // en GET, il n'y a pas de searchData.status === OK, mais juste la réponse
    if (searchData.results?.trackmatches?.track) {
      const tracks = searchData.results.trackmatches.track;
      console.log('tracks correspondant au search reçus:');
      console.log(tracks);
      return tracks;
    }

    console.error(`Echec: ${error.message}`);
  } catch (error) {
    console.log(`Echec: ${error.message}`);
    // relance erreur pour la gérer plus haut
    throw error;
  }
}

// --- API : TAG TRACK ---
// appel API POST pour tagger les morceau de musique enregistrée dans 'selectedTrack' dans le compte lastFM de l'utilisateur. (il n'y a pas de possibilité de faire de playlist)
export async function saveTags(artist, trackName, tags) {
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const sessionKey = localStorage.getItem('lastfm_session_key');
  const apiURL = 'http://ws.audioscrobbler.com/2.0/';
  try {
    //construction de la signature
    const stringToHash = `api_key${apiKey}artist${artist}methodtrack.addTagssk${sessionKey}tags${tags}track${trackName}${import.meta.env.VITE_LASTFM_CLIENT_SECRET}`;
    const apiSignature = calculateMD5(stringToHash);
    console.log('Signature créée pour saveTags:', apiSignature);

    // Construction du body en application/x-www-form-urlencoded
    const params = new URLSearchParams({
      method: 'track.addTags',
      artist: artist,
      track: trackName,
      tags: tags,
      api_key: apiKey,
      api_sig: apiSignature,
      sk: sessionKey,
      format: 'json',
    });

    console.log('Body envoyé:', params.toString());

    // POST request avec le body

    // Etape 1 : Objet response natif
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    console.log(response);

    // etape 2 : vérifier le HTTP (réseau, serveur, etc.)
    if (!response.ok) {
      throw new Error(
        `Erreur réseau: ${response.status} - ${response.statusText}`
      );
    }

    // étape 3 : Parser le JSON => objet JS normal
    const confirmation = await response.json();
    console.log(`la variable confirmation vaut : `);
    console.log(confirmation);

    // étape 4 : vérifier la logique Last.FM
    if (confirmation.error) {
      // confirmation.error est juste un nombre (10, 4, 6, etc.)
      // confirmation.message est juste un string
      throw new Error(
        `Last.fm : ${confirmation.error} ${confirmation.message}`
      );
    }

    // étape 5 : Succés !
    if (confirmation.status === 'ok') {
      console.log('Tags sauvegardés!');
    }
  } catch (error) {
    console.log('Echec:', error.message);
    // on relance l'erreur pour qu'elle puisse être gérée plus haut
    throw error;
  }
}

// --- API : LIKE TRACK ---
// appel API POST pour liker les morceau selectionnés dans 'selectedTrack'
export async function likeTrack(trackName, artist) {
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const sessionKey = localStorage.getItem('lastfm_session_key');
  const apiURL = 'http://ws.audioscrobbler.com/2.0/';

  try {
    // construction de la signature
    /**  api_key, artist, (api_sig), method, sk, track + clientsecret */
    const stringToHash = `api_key${apiKey}artist${artist}methodtrack.lovesk${sessionKey}track${trackName}${import.meta.env.VITE_LASTFM_CLIENT_SECRET}`;
    const apiSignature = calculateMD5(stringToHash);
    console.log(`Signature crée pour likeTrack: ${apiSignature}`);

    // construction du body en application/x-www-form-urlencoded
    const params = new URLSearchParams({
      method: 'track.love',
      track: trackName,
      artist: artist,
      api_key: apiKey,
      api_sig: apiSignature,
      sk: sessionKey,
      format: 'json',
    });

    console.log(params.toString());

    // POST resquest avec le body
    // étape 1: Objet response natif
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    console.log(response);

    // étape 3: Parser le JSON => objet JS normal
    // check for the response body in case of error
    const confirmation = await response.json(); // Parse even on error to get details
    console.log('la variable confirmation vaut : ');
    console.log(confirmation); // Log the response to see error details

    // étape 2: vérifier le HTTP (réseau, serveur, etc.)
    if (!response.ok) {
      throw new Error(
        `Erreur réseau: ${response.status} - ${response.statusText}`
      );
    }

    // étape 4: vérifier la logique last FM
    if (confirmation.error) {
      throw new Error(
        `Last.fm api error : ${confirmation.error} ${confirmation.message}`
      );
    }

    // étape 5: succès!
    if (confirmation.status === 'ok') {
      console.log('Les tracks ont été liké.');
    }
  } catch (error) {
    console.log(`Echec: ${error.message}`);
    // on relance l'erreur pour qu'elle puisse être traiter plus haut
    throw error;
  }
}
