import { combineReducers } from "redux";
import userReducer from "./sliceUsers";
import articleReducer from "./sliceArticles";
import sectionReducer from "./sliceSections";
import authReducer from "./sliceAuth";

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
  authors: userReducer,
  sections: sectionReducer,
});

export default rootReducer;
