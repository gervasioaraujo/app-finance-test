import AsyncStorage from '@react-native-community/async-storage';

export const clearAppData = async function () {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
        console.error(error);
    }
}

export async function setToken(token) {
    try {
        await AsyncStorage.setItem('USER_TOKEN', token);
    } catch (e) {
        console.log(e);
    }
    // return token;
}

export async function getToken() {
    let token = null;
    try {
        token = await AsyncStorage.getItem('USER_TOKEN');
    } catch (e) {
        console.log(e);
    }
    return token;
}

export async function deleteToken() {
    try {
        token = await AsyncStorage.removeItem('USER_TOKEN');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

// export async function createUser(user) {
//     try {
//         const res = await AsyncStorage.getItem('USERS');
//         let users = res !== null ? JSON.parse(res) : [];
//         users = users.concat(user);
//         await AsyncStorage.setItem('USERS', JSON.stringify(users));
//     } catch (e) {
//         console.log(e);
//     }
// }