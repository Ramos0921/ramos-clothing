import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';

let middleWare = process.env.NODE_ENV === 'development' ? [ logger ] : [];
middleWare = [...middleWare, thunk];

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const componseEnhancer = (process.env.NODE_ENV ==='development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = componseEnhancer(applyMiddleware(...middleWare));

export const store = createStore(persistedReducer, undefined, composeEnhancers);
export const persistor = persistStore(store);