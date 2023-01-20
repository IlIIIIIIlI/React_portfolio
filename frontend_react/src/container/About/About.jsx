import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';

import {AppWrap, MotionWrap} from '../../wrapper';
import './About.scss';
import {urlFor, client} from '../../client';

// 一开始的时候这个abouts就只是个图片gallery的展示
// const abouts = [{
//     title: 'web development',
//     description: ' I am a web development',
//     img_url: 'xxx'
// }, {title: 'web development', description: ' I am a web development', img_url: 'xxx'}];

const About = () => {

    // fetch real dynamic data from CMS
    // every sanity record can be a square to here then
    const [abouts, setAbouts] = useState([]);

    // at the beginning, only once
    useEffect(() => {
        const query = '*[_type == "abouts"]';
        client.fetch(query).then((data) => {
            setAbouts(data);
        });
    }, []);

    return (
        <>
            <h2 className="head-text">I Know that <span>Good Design</span> <br/>means <span>Good Business</span></h2>

            <div className="app__profiles">
                {abouts.map((about, index) => (
                    //   鼠标放过去的时候，这些小板块会发生变化
                    <motion.div
                        whileInView={{opacity: 1}}
                        whileHover={{scale: 1.1}}
                        transition={{duration: 0.5, type: 'tween'}}
                        className="app__profile-item"
                        key={about.title + index}
                    >
                        <img src={urlFor(about.imgUrl)} alt={about.title}/>
                        <h2 className="bold-text" style={{marginTop: 20}}>{about.title}</h2>
                        <p className="p-text" style={{marginTop: 10}}>{about.description}</p>
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(About, 'app__about'),
    'about',
    // give a white background, config in app.scss
    'app__whitebg',
);
