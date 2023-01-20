// contact part
import React, {useState} from 'react';

import {images} from '../../constants';
import {AppWrap, MotionWrap} from '../../wrapper';
import {client} from '../../client';
import './Footer.scss';

const Footer = () => {
    const [formData, setFormData] = useState({name: '', email: '', message: ''});
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const {username, email, message} = formData;

    const handleChangeInput = (e) => {
        // 从事件对象中获取表单元素的 name 和 value 值
        const {name, value} = e.target;
        // 使用结构赋值和展开运算符设置 formData 状态
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        // 设置 loading 状态为 true
        setLoading(true);

        const contact = {
            // _type 是 sanity的写法，定位到那个form
            _type: 'contact',
            // 从 formData 中获取用户名
            name: formData.username,
            // 获取邮箱
            email: formData.email,
            // 获取消息
            message: formData.message,
        };

        // 调用 client.create 方法创建 contact record
        client.create(contact)
            .then(() => {
                // 创建成功，设置 loading 状态为 false
                setLoading(false);
                // 设置表单已提交状态为 true
                setIsFormSubmitted(true);
            })
            // 创建失败，输出错误信息
            .catch((err) => console.log(err));
    };

    return (
        <>
            <h2 className="head-text">Take a coffee & chat with me</h2>

            <div className="app__footer-cards">
                <div className="app__footer-card ">
                    {/*配置邮箱图标和显示界面*/}
                    <img src={images.email} alt="email"/>
                    <a href="mailto:hello@micael.com" className="p-text">yangquechen@gmail.com</a>
                </div>
                <div className="app__footer-card">
                    {/*配置电话图标和显示界面*/}
                    <img src={images.mobile} alt="phone"/>
                    <a href="tel:+1 (123) 456-7890" className="p-text">0478498835</a>
                </div>
            </div>
            {!isFormSubmitted ? (
                <div className="app__footer-form app__flex">
                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Your Name" name="username" value={username}
                               onChange={handleChangeInput}/>
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="email" placeholder="Your Email" name="email" value={email}
                               onChange={handleChangeInput}/>
                    </div>
                    <div>
            <textarea
                className="p-text"
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
            />
                    </div>
                    <button type="button" className="p-text"
                            onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
                </div>
            ) : (
                // 提交之后的显示
                <div>
                    <h3 className="head-text">
                        Thank you for getting in touch!
                    </h3>
                </div>
            )}
        </>
    );
};

export default AppWrap(
    MotionWrap(Footer, 'app__footer'),
    'contact',
    'app__whitebg',
);
