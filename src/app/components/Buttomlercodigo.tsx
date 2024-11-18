"use client";
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

export function ButtomLerCodigo() {
  const videoRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
    } catch (error) {
      console.error("Erro ao iniciar a câmera", error);
    }
  };

  const captura = () => {
    if (videoRef.current && canvasRef.current) {
      const videoElement = videoRef.current.video;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (videoElement && context) {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(imageUrl);
        stopWebcam();
      }
    }
  };

  const resetWebcam = () => {
    stopWebcam();
    setCapturedImage(null);
  };

  return (
    <div className="text-center">
      <button
        className="ml-2 bg-green-100 py-3 px-6 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-green-600 hover:text-white active:bg-green-900"
        onClick={startWebcam}
      >
        Ler Código
      </button>

      {mediaStream && !capturedImage && (
        <div className="mt-4">
          <Webcam
            ref={videoRef}
            videoConstraints={{ width: 640, height: 480 }}
            screenshotFormat="image/jpeg"
          />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="hidden"
          ></canvas>
          <button
            className="ml-2 bg-blue-100 p-2 mt-2 z-10 rounded font-semibold text-base w-24 hover:bg-blue-600 hover:text-white active:bg-blue-900"
            onClick={captura}
          >
            Capturar
          </button>
        </div>
      )}

      {capturedImage && (
        <div className="mt-4">
          <Image src={capturedImage} alt="Captura" />
          <button
            className="ml-2 bg-red-100 p-2 mt-5 z-10 rounded font-semibold text-base w-24 hover:bg-red-600 hover:text-white active:bg-red-900"
            onClick={resetWebcam}
          >
            Resetar
          </button>
        </div>
      )}
    </div>
  );
}
