import { combineReducers } from "redux";
import userReducer from "./sliceUsers";
import articleReducer from "./sliceArticles";
import sectionReducer from "./sliceSections";

const rootReducer = combineReducers({
  articles: articleReducer,
  authors: userReducer,
  sections: sectionReducer,
});

export default rootReducer;
