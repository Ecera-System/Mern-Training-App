import React from 'react';
import './Spinner.css';

const SpinnerBtn = ({ parentClass, childClass }) => {
    return (
        <div className={`loader2 ${parentClass}`}>
            <div className={`rect1 ${childClass}`}></div>
            <div className={`rect2 ${childClass}`}></div>
            <div className={`rect3 ${childClass}`}></div>
            <div className={`rect4 ${childClass}`}></div>
            <div className={`rect5 ${childClass}`}></div>
        </div>
    );
};

export default SpinnerBtn;