import { FC, useEffect } from 'react';
import './Sidebar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useGoNavigate } from '../../../hooks/Navigation';
import { useEffectsContext } from '../../../contexts/EffectsContext';
import MenuIcons from '../../atoms/MenuIcons/MenuIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser ,faUserPen , faRectangleList} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../../../assets/sound-symfo.png";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {

  const { navigateTo } = useGoNavigate();
  
  const { canOpenSidebar,sidebarIsOpen} = useEffectsContext();
  const location = useLocation();
  const { pathname} = location;
  const path = pathname.split('/');

  const currentPath = Array.from(path) && Array.from(path)[0] === '' ? Array.from(path)[1] : 'empty';

  const handleOpenPanel = () => {
    let tabCourseSettings : string[] = ["courses","instruments","categories","composers"];
    let btnCourse = document.getElementById("course-settings");

    let tabUsersSettings : string[] = ["professors","students","entreprise"];
    let btnUser = document.getElementById("user-settings");

   let btnhomepage = document.getElementById("homepage-datas");
   let btnForum = document.getElementById("forum-settings");

    if(tabCourseSettings.includes(currentPath) && btnCourse){
      btnCourse.classList.add("active");
    } else if(!tabCourseSettings.includes(currentPath) && btnCourse ){
      btnCourse.classList.remove("active");
    }

    if(tabUsersSettings.includes(currentPath) && btnUser){
      btnUser.classList.add("active");
    } else if(!tabUsersSettings.includes(currentPath) && btnUser ){
      btnUser.classList.remove("active");
    }

    if(tabCourseSettings.includes(currentPath) && btnCourse){
      btnCourse.classList.add("active");
    } else if(!tabCourseSettings.includes(currentPath) && btnCourse ){
      btnCourse.classList.remove("active");
    }

    if( currentPath === 'forum' && btnForum ){
      btnForum.classList.add("active");
    } else if(currentPath !== 'forum' && btnForum ){
      btnForum.classList.remove("active");
    }

    if( currentPath === 'homepage' && btnhomepage ){
      btnhomepage.classList.add("active");
    } else if(currentPath !== 'homepage' && btnhomepage ){
      btnhomepage.classList.remove("active");
    }
  };

  const addClassActive = (path: string ) => {
    navigateTo(path);
  };

  useEffect(() => {
    handleOpenPanel();
  });

  return (
    <aside className={`sidebar-container ${sidebarIsOpen ? 'open' : 'close'}`} data-testid="Sidebar">
      <div className='zone-btn-close'>
          <MenuIcons variant='closed' handleClick={canOpenSidebar} />
      </div>
      <div className='logo-zone'>
        <img src={logoImage}  alt="img-logo"   />
      </div>
      <ul className="sidebar-list">
          {/* <li className="sidebar-item">
            <button 
              className="accordion" 
              id='homepage-datas' 
              onClick={(e)=> addClassActive('/homepage')}
            > 
            <FontAwesomeIcon icon={faChartLine} />
              Tableau de bord
            </button>
          </li> */}

          <li className="sidebar-item">
            <button className="accordion" id='course-settings' onClick={(e)=> addClassActive('/courses')} >
              <FontAwesomeIcon icon={faChalkboardUser}  /> Aprrentissage
            </button>
            <ul className="panel">
              <li className="sidebar-item-nested">
                  <Link className={`link-sidebar ${currentPath === 'courses' ? 'active' : '' }`} to="/courses">Cours</Link>
              </li>
              <li className="sidebar-item-nested">
                  <Link className={`link-sidebar ${currentPath === 'composers' ? 'active' : '' }`} to="/composers">Compositeurs</Link>
              </li>
              <li className="sidebar-item-nested">
                <Link className={`link-sidebar ${currentPath === 'instruments' ? 'active' : '' }`} to="/instruments">Instruments</Link>
              </li>
              <li className="sidebar-item-nested">
                  <Link className={`link-sidebar ${currentPath === 'categories' ? 'active' : '' }`} to="/categories">Catégories</Link>
              </li>

            </ul>
          </li>

          <li className="sidebar-item">
            <button className="accordion" id='user-settings' onClick={(e)=> addClassActive('/professors')}   >
              <FontAwesomeIcon icon={faUserPen}  /> Gestion des utilisateurs
            </button>
            <ul className="panel">
              <li className="sidebar-item-nested">
                <Link className={`link-sidebar ${currentPath === 'students' ? 'active' : '' }`} to="/students">Élèves</Link>
              </li>
              <li className="sidebar-item-nested">
                <Link className={`link-sidebar ${currentPath === 'professors' ? 'active' : '' }`} to="/professors">Professeurs</Link>
              </li>
              <li className="sidebar-item-nested">
                <Link className={`link-sidebar ${currentPath === 'entreprise' ? 'active' : '' }`} to="/entreprise">Équipe entreprise</Link>
              </li>
            </ul>
          </li>

          <li className="sidebar-item">
            <button 
            className="accordion" 
            id='forum-settings'  
            onClick={(e)=> addClassActive('/forum')} 
          > 
            <FontAwesomeIcon icon={faRectangleList} /> Forum
            </button>
          </li>
      </ul>
    </aside>

  )

};

export default Sidebar;
