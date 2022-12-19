// @ts-ignore
import preloader from './loading.svg';
// @ts-ignore
import s from './Preloader.module.css';
import React from 'react';

const Preloader = () => {
    return (
        <div className={s.wrapper}>
            <img src={preloader} alt="preloader" className={s.loadingImg}/>
        </div>
    )
}

export default Preloader;