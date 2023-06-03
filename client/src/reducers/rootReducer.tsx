import { combineReducers } from "redux";
import userReducer from "./sliceUsers";
import articleReducer from "./sliceArticles";
import sectionReducer from "./sliceSections";
import authReducer from "./sliceAuth";
import publicityReducer from "./slicePublicities";

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
  authors: userReducer,
  sections: sectionReducer,
  publicities: publicityReducer,
});

export default rootReducer;
