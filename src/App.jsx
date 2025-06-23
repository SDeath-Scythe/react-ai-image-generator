import './App.css';
import users from './data.json';
import Cards from './components/Cards.jsx';
import Cardsapi from './components/Cardsapi.jsx';
import Image from './components/image.jsx';
function App() {
  return (
    <div className="container">
      <h1>Image Generating</h1>
      <div id='main-container'> 
        
        <Image></Image>
        
        
      </div>
    </div>
  );
}

export default App;
