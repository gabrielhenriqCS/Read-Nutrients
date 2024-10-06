import React, { useState, useEffect, useRef } from "react"
import Webcam from "react-webcam";

export function ButtomLerCodigo() { 
    const webcamCaptura = () => {
        const webcamRef = useRef(null);
        const [imgSrc, setImgSrc] = useState(null);

        const capture = React.useCallback(() => {
            const imageSrc = (webcamRef.current as any).getScreenshot();
            setImgSrc(imageSrc);
        }, [webcamRef, setImgSrc]);
    }

    
    return (
        <button className="ml-2 mt-5 bg-green-100 p-2 z-10 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900" onClick={webcamCaptura}>Ler Código</button>  
    )
}