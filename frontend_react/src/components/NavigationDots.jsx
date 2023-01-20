/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */

import React from 'react';

const NavigationDots = ({active}) => (
    <div className="app__navigation">
        {/* similar thing with the nav bar*/}
        {['home', 'about', 'work', 'skills', 'testimonial', 'contact'].map((item, index) => (
            <a
                href={`#${item}`}
                // to make it unique
                key={item + index}
                className="app__navigation-dot"
                // 设置选中和未选中颜色
                style={active === item ? {backgroundColor: '#313BAC'} : {}}
            />
        ))}
    </div>
);

export default NavigationDots;
