import { lazy } from "react";

const QuizMakerPage = lazy(() => import("../containers/QuizMaker"));
const QuizResultPage = lazy(() => import("../containers/QuizResult"));

const routes = [
  {
    path: "/",
    element: <QuizMakerPage />,
  },
  {
    path: "/results",
    element: <QuizResultPage />,
  },
];

export default routes;
