import React, { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "./components/Tweet";
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

function App() {
  const [tweets, setTweets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('apple');
  const [nextLoadKey, setNextLoadKey] = useState('');
  const [loadMoreTrigger, setLoadMoreTrigger] = useState('');

  useEffect(()=>{
    axios.get(`/api/tweetdatas/?hash=${searchSubmit}&nextlist=${loadMoreTrigger}`)
      .then(res => {
        setTweets(res.data.results);
        setNextLoadKey(res.data.next ? res.data.next : '');
      });
  }, [searchSubmit, loadMoreTrigger]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setSearchSubmit(searchInput)
  };
  const onKeyPressInInput = (e) => {
    if(e.key === 'Enter'){
      setSearchSubmit(searchInput)
    }
  }
  const loadMoreTweets = () => {
    setLoadMoreTrigger(nextLoadKey)
  }

  return (
    <div className="App">
      <Container style={{ padding: 10 }}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="search by #Tag"
            aria-label="search by #Tag"
            aria-describedby="basic-addon2"
            onChange={ e => setSearchInput(e.target.value)}
            onKeyPress={ onKeyPressInInput }
          />
          <InputGroup.Append>
            <Button 
              variant="outline-secondary" 
              onClick={ onSearchSubmit }>
                Button
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
      <Container>
        <Row>
          { tweets && tweets.map( (tweet, i) => 
            <Col key={ i } sm={ 12 } md={ 6 } lg={ 4 }>
            <Tweet 
              id_str = { tweet.id_str }
              text = { tweet.text }
              screen_name = { tweet.user.screen_name } 
              profile_image_url_https = { tweet.user.profile_image_url_https } 
              name = { tweet.user.name }
            />
            </Col>
          )}
        </Row>
      </Container>
      { nextLoadKey && 
        <Container>
          <Button variant="primary" size="lg" block onClick={ loadMoreTweets }>NEXT</Button> 
        </Container>
      }
    </div>
  );
};

export default App;
