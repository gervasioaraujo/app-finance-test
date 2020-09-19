import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import authReducer from './ducks/auth';
import bankAccountsReducer from './ducks/bankAccounts';

// const rootPersistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     blacklist: ['authReducer', 'bankAccountsReducer']
// }

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist: ['isLoading', 'errorMessage']
};

const bankAccountsPersistConfig = {
    key: 'bankAccounts',
    storage: AsyncStorage,
    blacklist: ['isLoading', 'errorMessage']
};

const rootReducer = combineReducers({
    authReducer: persistReducer(authPersistConfig, authReducer),
    bankAccountsReducer: persistReducer(bankAccountsPersistConfig, bankAccountsReducer),
});

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const configStore = () => {
    let store = createStore(rootReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
}

export default configStore;