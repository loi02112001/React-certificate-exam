import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  resetQuestionAction,
  getListQuestionAction,
  chooseAnswerAction,
} from "../redux/reducers/QuestionSlide";
import {
  selectLoading,
  selectListQuestions,
  selectListChoosedAnswers,
} from "../redux/selectors/QuestionSelector";
import { Container } from "react-bootstrap";
import CategoryApi from "../api/CategoryApi";
import FilterCategoryAndDifficultyForm from "../components/FilterQuestion";
import QuestionForm from "../components/QuestionForm";

const QuizMakerPage = ({
  isQuestionLoading,
  questions,
  choosedAnswers,
  resetQuestionAction,
  getListQuestionAction,
  chooseAnswerAction,
}) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const data = await CategoryApi.getAllCategories();
      setCategories(data.trivia_categories);
    };
    resetQuestionAction();
    getAllCategories();
  }, [resetQuestionAction]);

  const redirectToQuizResultPage = useCallback(() => {
    navigate("/results");
  }, [navigate]);

  const FilterCategoryAndDifficultyFormMemo = useMemo(
    () => (
      <FilterCategoryAndDifficultyForm
        categories={categories}
        isSubmitting={isQuestionLoading}
        onSubmit={getListQuestionAction}
      />
    ),
    [categories, isQuestionLoading, getListQuestionAction]
  );

  const QuestionFormMemo = useMemo(
    () => (
      <QuestionForm
        questions={questions}
        choosedAnswers={choosedAnswers}
        onChooseAnswer={chooseAnswerAction}
        onSubmit={redirectToQuizResultPage}
      />
    ),
    [questions, choosedAnswers, chooseAnswerAction, redirectToQuizResultPage]
  );

  return (
    <>
      <Container fluid className="p-0">
        <h2 className="text-center">QUIZ MAKER</h2>
        <div className="mt-3">{FilterCategoryAndDifficultyFormMemo}</div>
        {questions.length !== 0 && (
          <div className="mt-3 d-flex justify-content-center">
            <div>{QuestionFormMemo}</div>
          </div>
        )}
      </Container>
    </>
  );
};

export default connect(
  (state) => {
    return {
      isQuestionLoading: selectLoading(state),
      questions: selectListQuestions(state),
      choosedAnswers: selectListChoosedAnswers(state),
    };
  },
  { resetQuestionAction, getListQuestionAction, chooseAnswerAction }
)(QuizMakerPage);
