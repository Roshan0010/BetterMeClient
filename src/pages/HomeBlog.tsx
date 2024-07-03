import { useNavigate } from 'react-router';

const HomeBlog = () => {
    const navigate=useNavigate();
  return (
    <div>
        <button onClick={()=>navigate('/login')}>
            get started
        </button>
    </div>
  )
}

export default HomeBlog;