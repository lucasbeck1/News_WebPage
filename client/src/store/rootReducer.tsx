import { combineReducers } from "redux";
import userReducer from "./reducers/sliceUsers";
import articleReducer from "./reducers/sliceArticles";
import sectionReducer from "./reducers/sliceSections";
import authReducer from "./reducers/sliceAuth";
import publicityReducer from "./reducers/slicePublicities";
import sponsorReducer from "./reducers/sliceSponsors";

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
  authors: userReducer,
  sections: sectionReducer,
  publicities: publicityReducer,
  sponsors: sponsorReducer,
});

export default rootReducer;
