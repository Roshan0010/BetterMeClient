import { useRecoilValue } from "recoil";
import { tokenState, userState } from "../store/atoms/AuthAtom";
import Dashboard from './Dashboard';
import HomeBlog from './HomeBlog';
import Header from "../components/Header";

const Redirect = () => {
  const token = useRecoilValue(tokenState);
  const user = useRecoilValue(userState);

  if (token && user) {
    return<div>
      <Header/>
      <Dashboard />
    </div> ;
  } else if (token && !user) {
    return <div>Loading...</div>;
  } else  {
    return <HomeBlog/>
  }
};

export default Redirect;