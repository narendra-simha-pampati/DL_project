# Face Authentication System

A full-stack authentication website with face recognition capabilities using React, Node.js, Express, MongoDB, and face-api.js.

## Features

- **User Registration**: Register with name, username, password, and face capture
- **Dual Login Methods**: 
  - Traditional username/password authentication
  - Face recognition login using webcam
- **JWT Authentication**: Secure token-based authentication
- **Modern UI**: Beautiful responsive design with Tailwind CSS
- **Face Recognition**: Real-time face detection and matching using face-api.js

## Project Structure

```
face-auth-system/
├── backend/
│   ├── models/
│   │   └── User.js              # Mongoose user model with face embeddings
│   ├── routes/
│   │   └── auth.js              # Authentication routes
│   ├── middleware/
│   │   └── auth.js              # JWT middleware
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── FaceCapture.tsx  # Face capture component
│   │   ├── context/
│   │   │   └── AuthContext.tsx  # Authentication context
│   │   ├── hooks/
│   │   │   └── useFaceRecognition.ts  # Face recognition hook
│   │   ├── pages/
│   │   │   ├── Login.tsx        # Login page
│   │   │   ├── FaceLogin.tsx    # Face login page
│   │   │   ├── Register.tsx     # Registration page
│   │   │   └── Welcome.tsx      # Welcome page
│   │   ├── services/
│   │   │   └── auth.ts          # API services
│   │   └── App.tsx              # Main app component
│   ├── public/
│   │   └── models/              # Face-api.js model files
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following environment variables:
   ```
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/face_auth_db
   JWT_SECRET=your_secret_key
   PORT=5001
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will be running on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Download face-api.js models:
   - Visit: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
   - Download the following model files:
     - `tiny_face_detector_model-weights_manifest.json`
     - `tiny_face_detector_model-shard1`
     - `face_landmark_68_model-weights_manifest.json`
     - `face_landmark_68_model-shard1`
     - `face_recognition_model-weights_manifest.json`
     - `face_recognition_model-shard1`
     - `face_recognition_model-shard2`
   - Place these files in `public/models/` directory

4. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will be running on `http://localhost:3000`

## How Face Recognition Works

### Registration Flow

1. **User Input**: User enters name, username, and password
2. **Face Capture**: User allows webcam access and positions face in camera
3. **Face Detection**: face-api.js detects the face and generates a 128-dimensional embedding
4. **Storage**: The face embedding is stored along with user credentials in MongoDB
5. **Account Creation**: User account is created with both password and face data

### Face Login Flow

1. **Camera Access**: User grants webcam permission
2. **Face Detection**: System captures live face data
3. **Embedding Generation**: Generates face embedding from current face
4. **Database Comparison**: Compares current embedding against stored embeddings
5. **Distance Calculation**: Uses Euclidean distance to find best match
6. **Authentication**: If distance is below threshold (0.6), user is authenticated

### Technical Details

- **Face Embeddings**: 128-dimensional numerical vectors representing facial features
- **Distance Threshold**: 0.6 (configurable) - lower means stricter matching
- **Face Detection**: Uses TinyFaceDetector for real-time detection
- **Recognition**: Face recognition net generates embeddings
- **Storage**: Embeddings stored as arrays in MongoDB

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register new user with face data
- `POST /api/auth/login` - Login with username and password
- `POST /api/auth/face-login` - Login with face recognition
- `GET /api/auth/me` - Get current user info (protected)

### Request/Response Examples

#### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "password123",
  "faceDescriptor": [0.1, 0.2, 0.3, ...] // 128 numbers
}
```

#### Face Login
```json
POST /api/auth/face-login
{
  "faceDescriptor": [0.1, 0.2, 0.3, ...] // 128 numbers
}
```

## Security Features

- **Password Hashing**: Uses bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Face Recognition**: Biometric authentication with configurable threshold
- **CORS Protection**: Cross-origin request sharing configured
- **Input Validation**: Request validation using express-validator

## Troubleshooting

### Common Issues

1. **Camera Access Denied**: Ensure browser has camera permissions
2. **Face Models Not Loading**: Verify model files are in `public/models/`
3. **MongoDB Connection Error**: Check MONGO_URI in .env file
4. **Port Already in Use**: Kill existing processes or change port

### Face Recognition Tips

- Ensure good lighting conditions
- Position face directly in front of camera
- Remove glasses/hats for better recognition
- Keep face centered in the video frame

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Face Recognition**: face-api.js
- **Database**: MongoDB Atlas

## License

MIT License
