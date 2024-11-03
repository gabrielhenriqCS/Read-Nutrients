"use client"
import React, { useState, useEffect, useRef } from "react"
import Webcam from "react-webcam";

export function ButtomLerCodigo() { 

    const videoRef = React.useRef<Webcam>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
        
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
    const stopWebcam = () => {
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
          setMediaStream(null);
        }
    }
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setMediaStream(stream);
      } catch (error) {
        console.error("Erro ao iniciar a câmera", error);
      }
    };

    const captura = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            const imageUrl = canvas.toDataURL("image/jpeg");
            setCapturedImage(imageUrl);
            stopWebcam();
        }
    }

    const resetWebcam = () => {
        stopWebcam();
        setCapturedImage(null);
    }

    return (
        <>
        <button className="ml-2 bg-green-100 p-2 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900" onClick={startWebcam}>Ler Código</button>
        {capturedImage ? (
            <>
            <button className="ml-2 bg-red-100 p-2 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-red-600 hover:text-white active:bg-red-900" onClick={resetWebcam}>Resetar</button>
            </>)
            : null}
        </>  
    )
    }
