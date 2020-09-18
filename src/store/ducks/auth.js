import api from '../../services/api';

export const Types = {
    REGISTER_USER_STARTED: 'REGISTER_USER_STARTED',
    REGISTER_USER_SUCCED: 'REGISTER_USER_SUCCED',
    REGISTER_USER_FAILS: 'REGISTER_USER_FAILS',
    LOGIN_STARTED: 'LOGIN_STARTED',
    LOGIN_SUCCED: 'LOGIN_SUCCED',
    LOGIN_FAILS: 'LOGIN_FAILS',
    LOGOUT: 'LOGOUT',
};

const initialState = {
    isLoading: false,
    errorMessage: null,
    user: null,
    userToken: null
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
            // const { user } = action.payload;
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                // user
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
                userToken
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
                user: null,
                userToken: null
            };
        }
        default:
            return state;
    }
}

export function register(user) {

    return async (dispatch) => {

        dispatch({ type: Types.REGISTER_USER_STARTED });

        console.log(user);

        try {
            const res = await api.post('/auth/local/register', JSON.stringify(user));
            // const res = await api.post('/auth/local/register', user);
            console.log(res);
            // const operations = res.data;
            // dispatch({
            //     type: Types.REGISTER_USER_SUCCED,
            //     payload: { operations }
            // });
        } catch (e) {
            console.log(e);
            // dispatch({
            //     type: Types.REGISTER_USER_FAILS,
            //     payload: { errorMessage: e.response.data.error },
            // });
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
            // await setToken(jwt);
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