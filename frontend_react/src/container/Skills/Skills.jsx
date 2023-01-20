import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Tooltip} from 'react-tooltip';

import {AppWrap, MotionWrap} from '../../wrapper';
import {urlFor, client} from '../../client';
import './Skills.scss';

const Skills = () => {
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const query = '*[_type == "experiences"]';
        const skillsQuery = '*[_type == "skills"]';

        client.fetch(query).then((data) => {
            setExperiences(data);
        });

        client.fetch(skillsQuery).then((data) => {
            setSkills(data);
        });
    }, []);

    return (
        <>
            <h2 className="head-text">Skills & Experiences</h2>

            <div className="app__skills-container">
                <motion.div className="app__skills-list">
                    {skills.map((skill) => (
                        <motion.div
                            whileInView={{opacity: [0, 1]}}
                            transition={{duration: 0.5}}
                            className="app__skills-item app__flex"
                            key={skill.name}
                        >
                            <div
                                className="app__flex"
                                style={{backgroundColor: skill.bgColor}}
                            >
                                <img src={urlFor(skill.icon)} alt={skill.name}/>
                            </div>
                            <p className="p-text">{skill.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <div className="app__skills-exp">
                    {experiences.map((experience) => (
                        <motion.div
                            className="app__skills-exp-item"
                            key={experience.year}
                        >
                            <div className="app__skills-exp-year">
                                {/* 展示年份 */}
                                <p className="bold-text">{experience.year}</p>
                            </div>
                            <motion.div className="app__skills-exp-works">
                                {experience.works.map((work) => (
                                    <>
                                        <motion.div
                                            // {/* 当元素出现在视图中时，设置 opacity 为 1 */}
                                            whileInView={{opacity: [0, 1]}}
                                            // {/* 设置动画过渡效果 */}
                                            transition={{duration: 0.5}}
                                            className="app__skills-exp-work"
                                            data-tip
                                            // {/* 展示作品名称 */}
                                            data-for={work.name}
                                            // 展示公司名称
                                            key={work.name}
                                        >
                                            <h4 className="bold-text">{work.name}</h4>
                                            <p className="p-text">{work.company}</p>
                                        </motion.div>
                                        <Tooltip
                                            // 设置 tooltip 的 id
                                            id={work.name}
                                            // 设置 tooltip 效果
                                            effect="solid"
                                            //设置 tooltip 箭头颜色
                                            arrowColor="#fff"
                                            //设置 tooltip 类名
                                            className="skills-tooltip"
                                        >
                                            {/*展示作品描述 */}
                                            {work.desc}
                                        </Tooltip>
                                    </>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'skills',
    'app__whitebg',
);
