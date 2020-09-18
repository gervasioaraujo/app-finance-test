import api from '../../services/api';
import { clearAppData } from '../../services/localDb';
import { Alert } from 'react-native';

import { intitalBankAccounts } from './fakeData/bankAccounts';
import { intitalOperations } from './fakeData/operations';


export const Types = {
    LIST_BANK_ACCOUNTS_STARTED: 'LIST_BANK_ACCOUNTS_STARTED',
    LIST_BANK_ACCOUNTS_SUCCED: 'LIST_BANK_ACCOUNTS_SUCCED',
    LIST_BANK_ACCOUNTS_FAILS: 'LIST_BANK_ACCOUNTS_FAILS',
    LIST_OPERATIONS_STARTED: 'LIST_OPERATIONS_STARTED',
    LIST_OPERATIONS_SUCCED: 'LIST_OPERATIONS_SUCCED',
    LIST_OPERATIONS_FAILS: 'LIST_OPERATIONS',
    CREATE_OPERATION_STARTED: 'CREATE_OPERATION_STARTED',
    CREATE_OPERATION_SUCCED: 'CREATE_OPERATION_SUCCED',
    CREATE_OPERATION_FAILS: 'CREATE_OPERATION_FAILS',
    CREATE_TRANSFER_STARTED: 'CREATE_TRANSFER_STARTED',
    CREATE_TRANSFER_SUCCED: 'CREATE_TRANSFER_SUCCED',
    CREATE_TRANSFER_FAILS: 'CREATE_TRANSFER_FAILS'
};

const initialState = {
    isLoading: false,
    errorMessage: null,
    bankAccounts: intitalBankAccounts,
    operations: intitalOperations
};

export default function bankAccountsReducer(state = initialState, action) {
    switch (action.type) {
        case Types.LIST_BANK_ACCOUNTS_STARTED:
            return {
                ...state,
                isLoading: true,
            };
        case Types.LIST_BANK_ACCOUNTS_SUCCED: {
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };
        }
        case Types.LIST_BANK_ACCOUNTS_FAILS: {
            const { errorMessage } = action.payload;
            return {
                ...state,
                isLoading: false,
                errorMessage
            };
        }
        case Types.LIST_OPERATIONS_STARTED:
            return {
                ...state,
                isLoading: true,
            };
        case Types.LIST_OPERATIONS_SUCCED: {
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };
        }
        case Types.LIST_OPERATIONS_FAILS: {
            const { errorMessage } = action.payload;
            return {
                ...state,
                isLoading: false,
                errorMessage
            };
        }
        case Types.CREATE_OPERATION_STARTED:
            return {
                ...state,
                isLoading: true,
            };
        case Types.CREATE_OPERATION_SUCCED: {
            const { operation } = action.payload;
            const { bank, value, type } = operation;
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                bankAccounts: state.bankAccounts.map(ba => {
                    if (ba.name === bank) {
                        if (type === 'incoming') {
                            ba.balance = Number(ba.balance) + Number(value);
                        } else ba.balance = Number(ba.balance) - Number(value);
                    }
                    return ba;
                }),
                operations: state.operations.concat(operation)
            };
        }
        case Types.CREATE_OPERATION_FAILS: {
            const { errorMessage } = action.payload;
            return {
                ...state,
                isLoading: false,
                errorMessage
            };
        }
        default:
            return state;
    }
}

export function listBanks() {

    return async (dispatch) => {

        // await clearAppData();

        dispatch({ type: Types.LIST_BANK_ACCOUNTS_STARTED });

        try {
            // const res = await api.get('/operations');
            // console.log(res);
            // const operations = res.data;
            dispatch({
                type: Types.LIST_BANK_ACCOUNTS_SUCCED,
            });
        } catch (e) {
            console.log(e);
            dispatch({
                type: Types.LIST_BANK_ACCOUNTS_FAILS,
                // payload: { errorMessage: e.response.data.error },
                payload: { errorMessage: e },
            });
        }

    }

}

export function listOperations() {

    return async (dispatch) => {

        dispatch({ type: Types.LIST_OPERATIONS_STARTED });

        try {
            // const res = await api.get('/operations');
            // console.log(res);
            // const operations = res.data;
            // const operations = intitalOperations;
            dispatch({
                type: Types.LIST_OPERATIONS_SUCCED,
                // payload: { operations }
            });
        } catch (e) {
            console.log(e);
            dispatch({
                type: Types.LIST_OPERATIONS_FAILS,
                // payload: { errorMessage: e.response.data.error },
                payload: { errorMessage: e },
            });
        }

    }

}

export function createOperation(operation, showFeedBack = true) {

    return async (dispatch) => {

        dispatch({ type: Types.CREATE_OPERATION_STARTED });

        try {
            // const res = await api.post('/operations', operation);
            dispatch({
                type: Types.CREATE_OPERATION_SUCCED,
                payload: { operation }
            });
            if (showFeedBack) Alert.alert('', 'Operação criada com sucesso!');
        } catch (e) {
            console.log(e);
            dispatch({
                type: Types.CREATE_OPERATION_FAILS,
                // payload: { errorMessage: e.response.data.error },
                payload: { errorMessage: e },
            });
        }

    }

}

export function createTransfer(transfer) {

    return async (dispatch) => {

        dispatch({ type: Types.CREATE_TRANSFER_STARTED });

        try {
            const { sourceBank, destinationBank, value, date } = transfer;
            const outcomingOperation = { bank: sourceBank, type: 'outcoming', description: 'Transferência (Saída)', value, date }
            dispatch(createOperation(outcomingOperation, false));
            const incomingOperation = { bank: destinationBank, type: 'incoming', description: 'Transferência (Entrada)', value, date };
            dispatch(createOperation(incomingOperation, false));
            dispatch({
                type: Types.CREATE_TRANSFER_SUCCED,
                // payload: { transfer }
            });
            Alert.alert('', 'Transferência criada com sucesso!');
        } catch (e) {
            console.log(e);
            dispatch({
                type: Types.CREATE_TRANSFER_FAILS,
                // payload: { errorMessage: e.response.data.error },
                payload: { errorMessage: e },
            });
        }

    }

}