import { Camera, CameraType } from 'expo-camera';

const _requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted'
}

export { _requestCameraPermission }