import React, { useEffect } from 'react';
import { useFaceRecognition } from '../hooks/useFaceRecognition';

interface FaceCaptureProps {
  onCapture: (descriptor: number[]) => void;
  buttonText?: string;
  className?: string;
}

export const FaceCapture: React.FC<FaceCaptureProps> = ({ 
  onCapture, 
  buttonText = 'Capture Face',
  className = ''
}) => {
  const {
    videoRef,
    isModelLoaded,
    isVideoReady,
    captureStatus,
    errorMessage,
    captureFace,
    initialize,
    cleanup,
  } = useFaceRecognition();

  useEffect(() => {
    initialize();
    return cleanup;
  }, [initialize, cleanup]);

  const handleCapture = async () => {
    const descriptor = await captureFace();
    if (descriptor) {
      onCapture(descriptor);
    }
  };

  const getStatusColor = () => {
    switch (captureStatus) {
      case 'capturing': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusMessage = () => {
    switch (captureStatus) {
      case 'capturing': return 'Capturing face...';
      case 'success': return 'Face captured successfully!';
      case 'error': return errorMessage || 'Failed to capture face';
      default: return isModelLoaded && isVideoReady ? 'Position face in camera and click capture' : 'Loading models and camera...';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative bg-black rounded-lg overflow-hidden" style={{ width: '640px', maxWidth: '100%' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-auto"
          width="640"
          height="480"
        />
        {!isVideoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>Initializing camera...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <p className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusMessage()}
        </p>
      </div>

      <button
        onClick={handleCapture}
        disabled={!isModelLoaded || !isVideoReady || captureStatus === 'capturing'}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {captureStatus === 'capturing' ? 'Capturing...' : buttonText}
      </button>
    </div>
  );
};
