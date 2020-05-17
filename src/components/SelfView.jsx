import React from 'react';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';

export default function() {
    const videoConstraints = {
        // width: '100%',
        // height: '100%',
        facingMode: 'user'
    };
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
    }, [webcamRef]);

    return (
        <div style={{ maxHeight: '50vh', maxWidth: '50vh' }}>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                width={1280}
                videoConstraints={videoConstraints}
            />
            {/* <Button onClick={capture}>Capture photo</Button> */}
        </div>
    );
}
