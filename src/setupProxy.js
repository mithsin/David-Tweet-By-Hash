const axios = require("axios");

module.exports = app => {
    app.get(`/api/tweetdatas/`, (req, res, next) => {
        const authBear = process.env.Twitter_Bearer;
        const nextlist = (req.query.nextlist ? `&next=${req.query.nextlist}` : '');

        axios.get(`https://api.twitter.com/1.1/tweets/search/30day/${ process.env.Twitter_env }.json?query=${ req.query.hash }&maxResults=12${ nextlist }`, {
          headers: { 
              'Authorization' :  authBear,
              'content-type'  :  'application/json'
            }
        })
          .then(info => {
            res.send(info.data)
          })
          .catch(err => console.log(err))
    })
};