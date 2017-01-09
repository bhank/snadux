import React from 'react';
import GithubRibbon from './GithubRibbon';

const Banner = () => (
    <div>
        <GithubRibbon/>
        <div className="banner">Snadux</div>
        <div>Press an arrow key (probably right or down) to start.</div>
    </div>
);

export default Banner;