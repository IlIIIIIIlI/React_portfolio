import React from 'react';
import {NavigationDots, SocialMedia} from '../components';

// AppWrap是一个高阶组件（HOC），它接受一个组件，一个id名称和类名为参数
const AppWrap = (Component, idName, classNames) => function HOC() {
    return (
        //   对每种这种结构的html都生成以下的东西
        <div id={idName} className={`app__container ${classNames}`}>
            {/*此组件将渲染SocialMedia组件*/}
            <SocialMedia/>
            <div className="app__wrapper app__flex">
                {/*此组件将渲染传入的组件*/}
                <Component/>

                <div className="copyright">
                    <p className="p-text">@2023 Quechen YANG</p>
                    <p className="p-text">All rights reserved</p>
                </div>
            </div>
            <NavigationDots active={idName}/>
        </div>
    );
};

// export default is a way to make a single value or function from a file or module available for other files to import.
export default AppWrap;
