import { combineReducers } from "redux";
import userReducer from "./sliceUsers";
import articleReducer from "./sliceArticles";
import sectionReducer from "./sliceSections";

const rootReducer = combineReducers({
  users: userReducer,
  articles: articleReducer,
  sections: sectionReducer,
});

export default rootReducer;
