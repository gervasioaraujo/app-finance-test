import api from '../../services/api';
import { Alert } from 'react-native';

export const Types = {
    REGISTER_USER_STARTED: 'REGISTER_USER_STARTED',
    REGISTER_USER_SUCCED: 'REGISTER_USER_SUCCED',
    REGISTER_USER_FAILS: 'REGISTER_USER_FAILS',
    LOGIN_STARTED: 'LOGIN_STARTED',
    LOGIN_SUCCED: 'LOGIN_SUCCED',
    LOGIN_FAILS: 'LOGIN_FAILS',
    LOGOUT: 'LOGOUT',
    LOCAL_LOGIN_SUCCED: 'LOCAL_LOGIN_SUCCED'
};

const initialState = {
    isLoading: false,
    errorMessage: null,
    user: null,
    userToken: null,
    isUserLoggedIn: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case Types.REGISTER_USER_STARTED:
            return {
                ...state,
                isLoading: true,
                errorMessage: null
            };
        case Types.REGISTER_USER_SUCCED: {
            const { user, userToken } = action.payload;
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                user,
                userToken,
                isUserLoggedIn: true
            };
        }
        case Types.REGISTER_USER_FAILS: {
            const { errorMessage } = action.payload;
            return {
                ...state,
                isLoading: false,
                errorMessage
            };
        }
        case Types.LOGIN_STARTED:
            return {
                ...state,
                isLoading: true,
                errorMessage: null
            };
        case Types.LOGIN_SUCCED: {
            const { user, userToken } = action.payload;
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                user,
                userToken,
                isUserLoggedIn: true
            };
        }
        case Types.LOGIN_FAILS: {
            const { errorMessage } = action.payload;
            return {
                ...state,
                isLoading: false,
                errorMessage
            };
        }
        case Types.LOGOUT: {
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                isUserLoggedIn: false
            };
        }
        case Types.LOCAL_LOGIN_SUCCED: {
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                isUserLoggedIn: true
            };
        }
        default:
            return state;
    }
}

export function register(userData, history) {

    return async (dispatch) => {

        dispatch({ type: Types.REGISTER_USER_STARTED });

        try {
            const res = await api.post('/auth/local/register', userData);
            console.log(res.data);
            const { jwt, user } = res.data;
            dispatch({
                type: Types.REGISTER_USER_SUCCED,
                payload: { user, userToken: jwt }
            });
            Alert.alert('', 'Usuário cadastrado!');
            history.push('/');
        } catch (e) {
            const [{ messages } = parentErrorObj] = e.response.data.message;
            const [{ message } = childErrorObj] = messages;
            console.log(message);
            dispatch({
                type: Types.REGISTER_USER_FAILS,
                payload: { errorMessage: message },
            });
        }

    }

}

export function login(userData) {

    return async (dispatch) => {

        dispatch({ type: Types.LOGIN_STARTED });

        try {
            const res = await api.post('/auth/local', userData);
            console.log(res.data);
            const { jwt, user } = res.data;
            dispatch({
                type: Types.LOGIN_SUCCED,
                payload: { user, userToken: jwt }
            });
        } catch (e) {
            const [{ messages } = parentErrorObj] = e.response.data.message;
            const [{ message } = childErrorObj] = messages;
            console.log(message);
            dispatch({
                type: Types.LOGIN_FAILS,
                payload: { errorMessage: message }
            });
        }

    }

}

export function logout() {
    return (dispatch) => {
        dispatch({ type: Types.LOGOUT });
    };
}

export function localLogin(history) {
    return async (dispatch) => {
        dispatch({ type: Types.LOCAL_LOGIN_SUCCED });
        dispatch(history.push('/'));
    };
}