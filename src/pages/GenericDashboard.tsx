
import { useParams } from 'react-router';

import BodyDashboard from './BodyDashboard';
import SkinDashboard from './SkinDashBoard';

const GenericDashBoard = () => {

  const params = useParams<{ transform: string }>();
 
  

  switch (params.transform) {
    case "skin":
      return <SkinDashboard/>
      break;
      case "body":
        return <BodyDashboard/>
        break;
  
    default:
      return null
      break;
  }
}
export default GenericDashBoard;