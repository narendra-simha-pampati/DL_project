import { useState, useRef, useCallback } from 'react';
import * as faceapi from 'face-api.js';

export const useFaceRecognition = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'capturing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const loadModels = useCallback(async () => {
    try {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setIsModelLoaded(true);
      console.log('Face-api models loaded successfully');
    } catch (error) {
      console.error('Error loading face-api models:', error);
      setErrorMessage('Failed to load face recognition models. Please refresh the page.');
      setCaptureStatus('error');
    }
  }, []);

  const startVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsVideoReady(true);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setErrorMessage('Failed to access webcam');
      setCaptureStatus('error');
    }
  }, []);

  const stopVideo = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsVideoReady(false);
  }, []);

  const captureFace = useCallback(async (): Promise<number[] | null> => {
    if (!videoRef.current || !isModelLoaded || !isVideoReady) {
      setErrorMessage('Camera or models not ready. Please wait...');
      setCaptureStatus('error');
      return null;
    }

    try {
      setCaptureStatus('capturing');
      
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection && detection.descriptor) {
        setCaptureStatus('success');
        console.log('Face captured successfully, descriptor length:', detection.descriptor.length);
        return Array.from(detection.descriptor);
      } else {
        setErrorMessage('No face detected. Please position your face clearly in the camera.');
        setCaptureStatus('error');
        return null;
      }
    } catch (error) {
      console.error('Error capturing face:', error);
      setErrorMessage('Error capturing face. Please try again.');
      setCaptureStatus('error');
      return null;
    }
  }, [isModelLoaded, isVideoReady]);

  const initialize = useCallback(async () => {
    await loadModels();
    await startVideo();
  }, [loadModels, startVideo]);

  const cleanup = useCallback(() => {
    stopVideo();
    setCaptureStatus('idle');
    setErrorMessage('');
  }, [stopVideo]);

  return {
    videoRef,
    isModelLoaded,
    isVideoReady,
    captureStatus,
    errorMessage,
    captureFace,
    initialize,
    cleanup,
  };
};
