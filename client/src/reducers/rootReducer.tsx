import { combineReducers } from "redux";
import userReducer from "./sliceUsers";
import articleReducer from "./sliceArticles";
import sectionReducer from "./sliceSections";

const rootReducer = combineReducers({
  user: userReducer,
  articles: articleReducer,
  section: sectionReducer,
});

export default rootReducer;
