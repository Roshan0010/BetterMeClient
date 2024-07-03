import { useEffect, useState } from "react";
import TransformCard from "../components/TransformCard";
import TransformViewCard from "../components/TransformViewCard";
import { useParams } from "react-router";
import moment from "moment";
import { database, id, query } from "../utils/apprite";
import { userState } from '../store/atoms/AuthAtom';
import { useRecoilValue } from "recoil";

const JourneyViewEditPage = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [mainDescription, setMainDescription] = useState("");
  const [docid, setDocId] = useState("");
  const { date} = useParams(); // Combine destructuring
  const {transform}=useParams();
  const [listData, setListData] = useState([]);
  const user = useRecoilValue(userState);
  const todaysDate = moment().format("DD-MM-YYYY");

  useEffect(() => {
    if (date === todaysDate) {
      setShowEdit(true);
    }
  }, [date]);

  useEffect(() => {
    const documentCheck = async () => {
      console.log(transform,date)
      try {
        console.log('*****');
        const getTransformData = await database.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          transform === "skin" 
            ? import.meta.env.VITE_APPWRITE_SKIN_COLLECTION
            : import.meta.env.VITE_APPWRITE_BODY_COLLECTION,
          [query.equal("date", date as string), query.equal("users", user.id)]
        );
        console.log(getTransformData);

        if (getTransformData.total > 0) {
          const document = getTransformData.documents[0];
          setMainDescription(document.mainDescription);
          setDocId(document.$id);
          setListData(transform === "skin" ? document.skinSubtable : document.bodySubtable || []);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        return false;
      }
    };

    const createNewDocument = async () => {
      const data = {
        date: moment().format("DD-MM-YYYY"),
        mainDescription: mainDescription,
        users: user.id,
        done: false,
        skinSubtable: transform === "skin" ? [] : undefined,
        bodySubtable: transform === "body" ? [] : undefined
      };

      try {
        const createDocumentPromise = await database.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          transform === "skin"
            ? import.meta.env.VITE_APPWRITE_SKIN_COLLECTION
            : import.meta.env.VITE_APPWRITE_BODY_COLLECTION,
          id.unique(),
          data
        );
        console.log(createDocumentPromise);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const mainLogin = async () => {
      const check = await documentCheck();
      if (!check) {
        await createNewDocument();
      }
    };

    mainLogin();
  }, [date, user, transform]); // Add transfrom to dependency array

  const handleMainDescSubmit = async () => {
    try {
      const updateDocumentPromise = await database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        transform === "skin"
          ? import.meta.env.VITE_APPWRITE_SKIN_COLLECTION
          : import.meta.env.VITE_APPWRITE_BODY_COLLECTION,
        docid,
        {
          mainDescription: mainDescription,
          done: true
        }
      );
      console.log(updateDocumentPromise);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-[100vh] w-full bg-[#020913] flex flex-col items-center gap-10 p-4'>
      <div className="w-full flex flex-col gap-10">
        {showEdit && <TransformCard docid={docid} />}
        {listData && listData.map((item) => (
          <TransformViewCard key={item.$id} description={item.description} id={item.$id} imageUrl={item.imageUrl} />
        ))}
        <div>
          <div className="flex gap-4 items-center justify-between ">
            <p className="text-white text-start sm:text-4xl text-2xl ">Days Description</p>
            { (date === todaysDate) && <button className="bg-[#135DA0] mb-2 text-white text-2xl px-5 rounded-xl py-2"
              onClick={handleMainDescSubmit}>
              Submit  
            </button>}
          </div>
          <textarea
            value={mainDescription}
            onChange={(e) => setMainDescription(e.target.value)}
            className="bg-[#0C2D48] text-white w-full flex text-2xl text-lg h-[10rem] rounded-xl p-3"
            disabled={!(date === todaysDate)}
          />
        </div>
      </div>
    </div>
  );
};

export default JourneyViewEditPage;