import { combineReducers } from "redux";
import userReducer from "./sliceUsers";
import articleReducer from "./sliceArticles";

const rootReducer = combineReducers({
  user: userReducer,
  article: articleReducer,
});

export default rootReducer;
