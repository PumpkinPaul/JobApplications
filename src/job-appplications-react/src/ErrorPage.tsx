import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex items-center justify-center h-screen">
      <div className="flex h-5 items-center space-x-4 ">
        <div className="font-bold border-r border-slate-600 pr-4 ">Oops!</div>
        <div>Sorry, an unexpected error has occurred.</div>
      </div>
    </div>
  );
}

/*error.statusText || error.message*/

export default ErrorPage;


