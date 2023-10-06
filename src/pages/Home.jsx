import { Link } from 'react-router-dom';
import { BiSolidRightArrow } from "react-icons/bi";
import '../styles/Home.css';




function Home() {
  return (
    <div className='divHome'>
      <h3>Bienvenue</h3>
      <Link to="/test" className='link'><BiSolidRightArrow size={20} /> Questionnaire des schémas de Young</Link>
    </div>
  )
}

export default Home;