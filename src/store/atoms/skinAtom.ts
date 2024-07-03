
import { atom } from 'recoil';


interface FaceSubTable {
    description: string;
    imageUrl: string;
    id: string;
  }
  
  interface SkinSkeleton {
    mainDescription: string;
    imageUrl: string;
    id: string;
    date: string;
    done: boolean;
    faceSubTable: FaceSubTable[];
  }
interface bodySkeleton{
    mainDescription: string,
    imageUrl:string,
    id:string,
    date:string,
    faceSubTable:[{
        description:string,
        imageUrl:string,
        id:string,  
    }    
    ]
}
interface daysDataAtom{
    id:string | null,
    date:string,
    done:boolean
}

export const skinTransform=atom<SkinSkeleton []>({
    key:"skinTransform",
    default: []
})
export const bodyTransform=atom<bodySkeleton []>({
    key:"bodyTransform",
    default: []
})
export const daysDataAtom = atom<daysDataAtom[]>({
    key: 'daysDataAtom',
    default: [],
  });
