import { useEffect } from 'react';
import DaysCard from '../components/DaysCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { daysDataAtom, skinTransform } from '../store/atoms/skinAtom';
import { userState } from '../store/atoms/AuthAtom';
import moment from 'moment';

const SkinDashboard = () => {
  const [skinTrans, setSkinTrans] = useRecoilState(skinTransform);
  const user = useRecoilValue(userState);
  const [daysData, setDaysData] = useRecoilState(daysDataAtom);

  interface DaysDataAtom {
    id: string | null;
    date: string;
    done: boolean;
  }

  enum theme {
    green,
    red,
    grey
  }

  useEffect(() => {
    const getAllSkinData = async () => {
      try {
        const getToken = localStorage.getItem('token');
        console.log(getToken);

        const response = await axios.post(
          '/api/get-skin-transform',
          { token: getToken },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        //here i need to post for updation of startBord if not data is avilabe for faceTransform
        console.log(response);
        if(response?.data?.body?.skinCollection){
          console.log("seting skintrans")
          setSkinTrans(response.data.body.skinCollection);
        }
        
      } catch (err) {
        console.error(err);
      }
    };

    getAllSkinData();
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const daysCalculation = () => {
      if (!user.skinStart) {
        return;
      }

      console.log("*********");
      const dateFromString = moment(user.skinStart, 'DD-MM-YYYY');


      if (!dateFromString.isValid()) {
        console.error("Invalid date format for user.skinStart");
        return;
      }

      const today = moment();
      const dateArray = [];
      const currentDate = dateFromString.clone();
      console.log(currentDate);
      console.log("01")
      console.log(skinTrans);
      console.log("02")

      while (currentDate.isBefore(today, 'day')) {
    
        const tempdate = currentDate.format('DD-MM-YYYY');
        let id = null;
        let done = false;
      
        for (let x = 0; x < skinTrans.length; x++) {
          console.log("&&&")
          console.log(skinTrans[x]?.date)
          
          if (skinTrans[x]?.date === tempdate) {
            id = skinTrans[x].id;
            done = skinTrans[x].done ? true : false;
            break;
          }
        }

        const tempdata = {
          date: tempdate,
          id: id,
          done: done
        };
        dateArray.push(tempdata);
        currentDate.add(1, 'day');
      }
      console.log("Generated dateArray:", dateArray);
      const reversedateArray = dateArray.reverse();
      console.log("Reversed dateArray:", reversedateArray);
      setDaysData(reversedateArray);
    };

    if (skinTrans.length) {
      daysCalculation();
    }
  }, [skinTrans, user.skinStart]);


  return (
    <div className="min-h-[100vh] bg-[#020913] flex flex-col gap-3 items-center p-4">
      <DaysCard
        type={"skin"}
        index={0}
        size={daysData.length + 1}
        id={null}
        date={moment().format('DD-MM-YYYY')}
        theme={theme.grey}
      />
      {daysData.map((item, index) => {
        console.log(moment().format('DD-MM-YYYY'));
        console.log(item.date);
        let currTheme = theme.red;
        if (item.done) {
          currTheme = theme.green;
        }
        

        return (
          <DaysCard
            type={"skin"}
            key={index}
            index={index}
            size={daysData.length}
            id={item.id}
            date={item.date}
            theme={currTheme}
          />
        );
      })}
    </div>
  );
};

export default SkinDashboard;