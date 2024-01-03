import './App.scss';
import Header from './components/organims/Header/Header';
import MainContent from './components/organims/MainContent/MainContent';
import Sidebar from './components/organims/Sidebar/Sidebar';
import { Login } from './components/pages';
import { useAuthContext } from './contexts/AuthContext';

const App: React.FC = () => {
  
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="element">
      { isAuthenticated && (
          <div className="global-container">
              <Sidebar />
              <div className='main-content'>
                  <nav>
                    <Header />
                  </nav>
                  <MainContent/>
              </div>
          </div>
      )}
      { !localStorage.getItem('jwt') && (<Login />)}
    </div>
  );
};

export default App;