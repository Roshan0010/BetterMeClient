import { useNavigate } from "react-router";
import facewash from "../assets/facewash.png"

enum theme {
  green,
  red,
  grey

}

type Props = {
  index: number;
  id: string | null;
  date: string|null;
  size: number;
  theme: theme;
  type:string;
};
  
 

const DaysCard = (props: Props) => {
  const navigate=useNavigate();

  console.log(props.theme);
  const handleClick=()=>{
    if(props.theme===theme.red){
      return;
    }
    navigate(`/journey/${props.type}/${props.date}`)
  }

    const subtitile=props.theme==theme.green?"Uploadeed jorney ":props.theme==theme.red?"Missed to upload":"Upload jorney"
  return (
    <div className={`sm:w-[80%] xxs:w-full xxs:
        h-[7rem] sm:h-[10rem] smd:h-[13rem] ${ props.theme === theme.red ? "bg-gradient-to-l from-[#FF4C4C] to-[#990000]" : 
    props.theme === theme.green ? "bg-gradient-to-l from-[#00FF00] to-[#006400]" : 
    "bg-gradient-to-l from-[#434849] to-[#2E2E2E]" } flex justify-between rounded-xl cursor-pointer 
        `} onClick={handleClick} >
            {/* onClick={()=>navigate(`/dashboard/${props.data.route}`)} */}
          <div className=' md:w-[70%] sm:w-[50%] xxs:w-[60%]  text-white relative '>
            <p className='lgx:text-6xl lg:text-5xl md:text-4xl sm:text-2xl text-2xl ml-4 mt-5'>
             Day {props.size-(props.index)}
            </p>
            <p  className='lgx:text-3xl lg:text-2xl  smd:opacity-75   md:text-xl  ml-4 mt-9'>
              {subtitile}
            </p>
            
    
    
          </div>
        <img src={facewash} alt="hi" className="sm:w-[50%] xxs:w-[40%]  smd:w-[30%] h-full opacity-30 object-contain" />
      </div>
  )
}

export default DaysCard