const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');

const server = express();
const PORT = config.port;
const GMAPS_KEY = config.gmaps.apikey;

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

const URL_SEARCH = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';

server.get('/place', (req, res) => {
    const query = req.query.query;
    const url = URL_SEARCH + query + '&key=' + GMAPS_KEY;
    console.log(URL_SEARCH)
    fetch(url)
        .then(place => place.json())
        .then(place => {
            console.log(place);
            res.status(STATUS_SUCCESS);
            res.send(place);
        })
        .catch(err => {
            res.status(STATUS_USER_ERROR);
            res.send({ err: err });
        });
});


// server.get('/places', (req, res) => {
//     let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.search}&key=${GMAPS_KEY}`
//     if (!req.body.search) {
//         res.status(STATUS_USER_ERROR);
//         res.json({ error: 'No search provided' });
//         return res.json(url);
//     }
   
//     fetch(url)
//         .then(res => res.join())
//         .then(json => json)
//         .catch(error => console.log(error));
//     res.status(STATUS_SUCESS);
//     console.log(url);
//     res.json(url);
// })

// // server.get('/places', (req, res) => {
// //     const search = req.body.search;
// //     const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query='Auburn, AL'&key=${GMAPS_KEY}`
// //     fetch(url)
// //     .then(response => {
// //         response.json().then(json => {
// //             console.log(
// //                 `City: ${json.results[0].formatted_address} -`,
// //             );
// //         })
// //     })
// //     .catch(error => {
// //         console.log(error);
// //     })
// // })

server.listen(PORT, err => {
    if(err) {
        console.log(`Error starting server: ${err}`);
    } else {
        console.log(`App listening on port ${PORT}`);
    }
});
