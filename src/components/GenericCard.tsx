import { useNavigate } from 'react-router';

type Props = {
  photo: string;
  gradColor: string;
  data: {
    route:string,
    title: string;
    subtitle: string;
  };
};

const GenericCard = (props: Props) => {
  const navigate =useNavigate();

  return (
    <div className={`w-[80%] xxs:
    h-[10rem] sm:h-[10rem] smd:h-[16rem] bg-red-400 flex justify-between rounded-xl cursor-pointer ${props.gradColor}
    `} onClick={()=>navigate(`/dashboard/${props.data.route}`)}>
      <div className=' md:w-[70%] sm:w-[50%] xxs:w-[40%]  text-white relative '>
        <p className='lgx:text-6xl lg:text-5xl md:text-4xl sm:text-2xl   ml-4 mt-5'>
          {props.data.title}
        </p>
        <p  className='lgx:text-3xl lg:text-2xl xxs:opacity-0 smd:opacity-75   md:text-xl  ml-4 mt-9'>
          {props.data.subtitle}
        </p>


      </div>
    <img src={props.photo} alt="" className="object-cover sm:w-[50%] xxs:w-[60%] opacity-50  smd:w-[30%] h-full" />
  </div>
    
  )
}

export default GenericCard