import { BrowserRouter as Router,Route} from "react-router-dom";
import Upload from "./components/upload.component"
import Download from "./components/downloads.component"
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
function App() {
  return (
     <Router>   
      {/* <br/> */}
      <Route path="/" exact component={Upload} />
      <Route path="/api/show/:id" component={Download} />
      </Router>
  );
}

export default App;
