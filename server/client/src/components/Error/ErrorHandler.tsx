// Handle Errors in the app
import { AxiosError } from 'axios';
import { FallbackProps } from 'react-error-boundary';
import { Error } from '.';
import useAppContext from '../../hooks/useAppContext';
interface Props extends FallbackProps {}

const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError;
};

const ErrorHandler: React.FC<Props> = ({ error, resetErrorBoundary }) => {
  const { setModalChildren, setIsModalOpen } = useAppContext();
  if (isAxiosError(error)) {
    if (error.response?.status === 401) {
      setModalChildren(
        <Error
          code={error.response.status}
          btn="Login Again if Issue Persists"
          retry
        />,
      );
    } else {
      setModalChildren(
        <Error code={error.response?.status} retry btn="Go Home" />,
      );
    }
  } else {
    setModalChildren(
      <Error
        msg="And Unidentified Exception Occurred..."
        error={error.message}
        retry
        btn="Go to home page"
      />,
    );
  }
  setIsModalOpen(true);
  resetErrorBoundary();
  return <div className="hidden" />;
};

export default ErrorHandler;
