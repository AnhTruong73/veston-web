"use client"
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from '@/app//redux/store';

export const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default ReduxProvider