import logo from './logo.svg';
import './App.css';
import CityList from './components/CityList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/react-datepicker/dist/react-datepicker.css"

function App() {
  return (
    <div className="App">
        <CityList></CityList>
    </div>
  );
}

export default App;
