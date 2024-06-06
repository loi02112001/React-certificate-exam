import { createSelector } from "@reduxjs/toolkit";

const selectListQuestionSelector = createSelector(
  (state) => state.question,
  (state) => state.questions
);

const selectLoadingSelector = createSelector(
  (state) => state.question,
  (state) => state.isLoading
);

const selectListChoosedAnswerSelector = createSelector(
  (state) => state.question,
  (state) => state.choosedAnswers
);

export const selectListQuestions = (state) => {
  return selectListQuestionSelector(state);
};

export const selectLoading = (state) => {
  return selectLoadingSelector(state);
};

export const selectListChoosedAnswers = (state) => {
  return selectListChoosedAnswerSelector(state);
};
