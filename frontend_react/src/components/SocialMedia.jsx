import React from 'react';
import {BsTwitter, BsInstagram} from 'react-icons/bs';
import {FaFacebookF} from 'react-icons/fa';

// this can be used in the wrapper
const SocialMedia = () => (
    <div className="app__social">
        <div>
            <BsTwitter/>
        </div>
        <div>
            <FaFacebookF/>
        </div>
        <div>
            <BsInstagram/>
        </div>
    </div>
);

export default SocialMedia;
