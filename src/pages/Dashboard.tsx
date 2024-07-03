/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericCard from "../components/GenericCard";
import skinCarePic from "../assets/faceCArdPic.png";
import bodyPic from "../assets/BodyCardPic.png";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms/AuthAtom";

function Dashboard() {
  const user = useRecoilValue(userState);

  const mainData = [
    {
      route: "skin",
      title: "View Your Path to Glowing Skin",
      subtitle: "Explore the journey of transforming your face"
    },
    {
      route: "body",
      title: "Explore Your Body Transformation Journey",
      subtitle: "Track your progress and see your body's transformation"
    }
  ];

  const altData = [
    {
      route: "skin",
      altTitle: "Start a mesmerizing skin transformation journey",
      altSubtitle: "Begin your journey to radiant skin today"
    },
    {
      route: "body",
      altTitle: "Kick off your body transformation adventure",
      altSubtitle: "Start your path to a fitter, healthier you"
    }
  ];

  const transformData = (data:any) => {
    return {
      route: data.route,
      title: data.title || data.altTitle,
      subtitle: data.subtitle || data.altSubtitle
    };
  };

  return (
    <div className='flex flex-col gap-10 items-center pt-4 bg-[#020913] min-h-[100vh]'>
      <GenericCard 
        photo={skinCarePic} 
        gradColor='bg-gradient-to-l from-emerald-500 to-emerald-900'
        data={transformData(user.skinStart ? mainData[0] : altData[0])}
      />
      <GenericCard 
        photo={bodyPic} 
        gradColor='bg-gradient-to-l from-purple-500 to-purple-900' 
        data={transformData(user.bodyStart ? mainData[1] : altData[1])}
      />
    </div>
  );
}

export default Dashboard;
