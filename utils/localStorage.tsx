import AsyncStorage from '@react-native-async-storage/async-storage';

const getObjFromLocalStorage = (nameObject: string) => async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(nameObject)
        return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error(e)
    }
}


const setLocalStorageObj = (nameObj: string, obj: any) => async () => {
    try {
        const jsonValue = JSON.stringify(obj)
        await AsyncStorage.setItem(nameObj, jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export { getObjFromLocalStorage, setLocalStorageObj };
