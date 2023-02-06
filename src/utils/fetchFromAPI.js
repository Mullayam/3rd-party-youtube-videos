import axios from "axios";

// const BASE_URL = "";

 var dataResponse; 


export const fetchFromAPI = async(query) =>{
  const options = {
    method: "GET",
    url: `https://youtube-v31.p.rapidapi.com/${query}`,
    params: {
      part: "snippet,id",
      regionCode: "IN",
      maxResults: "50",
    },
    headers: {
      "X-RapidAPI-Key": "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };
  await axios
     .request(options)
     .then(function (response) {
       dataResponse = response.data;      
     })
     .catch(function (error) {
       console.error(error);
     });
     return dataResponse;
}