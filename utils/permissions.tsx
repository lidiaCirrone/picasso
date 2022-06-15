import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const _requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted'
}


const _requestLibraryPermission = async () =>{
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted'
}

export { _requestCameraPermission ,_requestLibraryPermission}