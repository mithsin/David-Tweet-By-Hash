import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Tweet = ({
    id_str,
    text,
    screen_name, 
    profile_image_url_https, 
    name
    }) => {
    const userName = (screen_name >= 20 
        ? screen_name.substring(0, 20) + '...' 
        : screen_name);
    return (
        <div className="tweet-container">
            <img 
                src={ profile_image_url_https } 
                alt={ name } 
            />
            <p className="tweet-name">{ userName }</p>
            <p>{text}</p>
            <div className="tweet-more">
                <a 
                href={`https://twitter.com/${screen_name}/statuses/${id_str}`} 
                target="blank">
                    More...
                </a>
            </div>
        </div>
    )
};

Tweet.propTypes = {
    id_str: PropTypes.string,
    text: PropTypes.string,
    screen_name: PropTypes.string, 
    profile_image_url_https: PropTypes.string, 
    name: PropTypes.string
};
Tweet.defaultProps = {
    id_str: '',
    text: '',
    screen_name: '', 
    profile_image_url_https: '', 
    name: ''
};

export default Tweet;