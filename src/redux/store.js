import { configureStore } from "@reduxjs/toolkit";
import questionSlide from "./reducers/QuestionSlide";

const store = configureStore({
  reducer: {
    question: questionSlide.reducer,
  },
});
export default store;
