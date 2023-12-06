import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { CartReducer } from "./Cart/CartSlice";
import { ProductReducer } from "./Product/ProductSlice";
import { CategoryReducer } from "./Category/CategorySlice";
import { CommentReducer } from "./Comment/CommentSlice";
import { UserReducer } from "./User/UserReducer";
import { AuthReducer } from "./Auth/AuthSlice";
import { BillReducer } from "./Bills/BillSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export const rootReducer = combineReducers({
  products: ProductReducer,
  categories: CategoryReducer,
  comments: CommentReducer,
  users: UserReducer,
  carts: CartReducer,
  auth: AuthReducer,
  bills: BillReducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default persistStore(store);
