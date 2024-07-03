import { useRecoilValue } from "recoil";
import { tokenState, userState } from "../store/atoms/AuthAtom";
import Dashboard from './Dashboard';
import HomeBlog from './HomeBlog';

const Redirect = () => {
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);

  if (token && user) {
    return <Dashboard />;
  } else if (token && !user) {
    return <div>Loading...</div>;
  } else  {
    return <HomeBlog/>
  }
};

export default Redirect;