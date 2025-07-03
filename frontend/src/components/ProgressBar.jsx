// import React, { useState, useEffect } from "react";

const ProgressBar = ({ currentTime, duration }) => {
    const percent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="w-full bg-gray-200 h-3 rounded overflow-hidden mb-4">
            <div
                className="bg-lime-500 h-full transition-all"
                style={{ width: `${percent}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
