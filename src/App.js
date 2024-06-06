import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router/routes";
import Loading from "./components/Loading";

const App = () => {
  const content = useRoutes(routes);

  return <Suspense fallback={<Loading />}>{content}</Suspense>;
};

export default App;
