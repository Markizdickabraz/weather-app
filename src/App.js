import WeatherApp from './components/WeaterApp/WeatherApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <WeatherApp />
      <ToastContainer />
    </>
  );
}

export default App;
