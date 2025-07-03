import React, { useRef, useState } from "react";
import ProgressBar from "./ProgressBar";

const VideoPlayer = ({ videoUrl }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Lesson Video</h2>
            <ProgressBar currentTime={currentTime} duration={duration} />
            <video
                ref={videoRef}
                src={videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                controls
                className="w-full h-96 rounded shadow"
            >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
