import React, {useState, useEffect} from 'react';
import {AiFillEye, AiFillGithub} from 'react-icons/ai';
import {motion} from 'framer-motion';

import {AppWrap, MotionWrap} from '../../wrapper';
import {urlFor, client} from '../../client';
import './Work.scss';

const Work = () => {
    //使用useState hook声明一个works状态数组
    const [works, setWorks] = useState([]);
    //使用useState hook声明一个filterWork状态数组
    const [filterWork, setFilterWork] = useState([]);
    //使用useState hook声明一个filterWork状态数组
    const [activeFilter, setActiveFilter] = useState('All');
    //使用useState hook声明一个animateCard状态对象，并初始化为y:0, opacity:1
    const [animateCard, setAnimateCard] = useState({y: 0, opacity: 1});

    useEffect(() => {
        //声明一个query变量
        const query = '*[_type == "works"]';

        //使用client来请求数据
        client.fetch(query).then((data) => {
            //将请求回来的数据赋值给works状态
            setWorks(data);
            //将请求回来的数据赋值给filterWork状态
            setFilterWork(data);
        });
    }, []);

    const handleWorkFilter = (item) => {
        setActiveFilter(item);
        setAnimateCard([{y: 100, opacity: 0}]);

        setTimeout(() => {
            setAnimateCard([{y: 0, opacity: 1}]);

            if (item === 'All') {
                setFilterWork(works);
            } else {
                setFilterWork(works.filter((work) => work.tags.includes(item)));
            }
        }, 500);
    };

    return (
        <>
            <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

            <div className="app__work-filter">
                {/*预加载work的种类名称*/}
                {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'work_tags', 'All'].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <motion.div
                //将animateCard状态对象作为动画效果应用到该div上
                animate={animateCard}
                // 设置动画持续时间为0.5s，子元素延迟0.5s执行
                transition={{duration: 0.5, delayChildren: 0.5}}
                //设置该div的class为app__work-portfolio
                className="app__work-portfolio"
            >
                {filterWork.map((work, index) => (
                    // 循环渲染的每一项元素
                    <div className="app__work-item app__flex" key={index}>
                        <div
                            className="app__work-img app__flex"
                        >
                            <img src={urlFor(work.imgUrl)} alt={work.name}/>

                            <motion.div
                                // 当鼠标悬停在该div上时，设置opacity从0变为1
                                whileHover={{opacity: [0, 1]}}
                                // 设置动画持续时间为0.25s，缓动函数为easeInOut, 子元素间隔0.5s执行
                                transition={{duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5}}
                                // 设置该div的class为app__work-hover app__flex
                                className="app__work-hover app__flex"
                            >
                                <a href={work.projectLink} target="_blank" rel="noreferrer">

                                    <motion.div
                                        whileInView={{scale: [0, 1]}}
                                        whileHover={{scale: [1, 0.90]}}
                                        transition={{duration: 0.25}}
                                        className="app__flex"
                                    >
                                        <AiFillEye/>
                                    </motion.div>
                                </a>
                                <a href={work.codeLink} target="_blank" rel="noreferrer">
                                    <motion.div
                                        whileInView={{scale: [0, 1]}}
                                        whileHover={{scale: [1, 0.90]}}
                                        transition={{duration: 0.25}}
                                        className="app__flex"
                                    >
                                        <AiFillGithub/>
                                    </motion.div>
                                </a>
                            </motion.div>
                        </div>

                        <div className="app__work-content app__flex">
                            <h4 className="bold-text">{work.title}</h4>
                            <p className="p-text" style={{marginTop: 10}}>{work.description}</p>

                            <div className="app__work-tag app__flex">
                                <p className="p-text">{work.tags[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </>
    );
};

export default AppWrap(
    MotionWrap(Work, 'app__works'),
    'work',
    'app__primarybg',
);
