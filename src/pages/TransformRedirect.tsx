import { useParams } from 'react-router-dom';
import SkinDashboard from "./GenericDashboard";
import BodyDashboard from "./BodyDashboard";

const TransformRedirect = () => {
    const params = useParams<{ transform: string }>();
    const transform = params.transform;
    console.log(transform);
  
    if (transform === 'skin') {
        return <SkinDashboard />;
    } else if (transform === 'body') {
        return <BodyDashboard />;
    } else {
        return <div>Invalid transform type</div>;
    }
};

export default TransformRedirect;
