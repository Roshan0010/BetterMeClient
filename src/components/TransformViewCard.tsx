import React, { useEffect } from 'react';

type Props = {
  id: string;
  description: string;
  imageUrl: string;
};

const TransformViewCard = (props: Props) => {
  const { id, description, imageUrl } = props;

  // Split the description by newline characters
  const formattedDescription = description.split('\n');

  // Function to truncate description to about 10 words
  const truncateDescription = (desc: string) => {
    const words = desc.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return desc;
  };

  return (
    <div className='w-full sm:h-[15rem] h-[7rem] flex sm:gap-4 rounded-xl'>
      <img className='bg-blue-400 w-[40%] sm:w-[30%] h-full rounded-xl' src={imageUrl} alt='Image' />
      <div className='w-full h-full flex bg-[#0C2D48] rounded-xl flex-col items-center'>
        <div className='w-[100%] h-full text-white bg-[#0C2D48] text-lg sm:text-2xl p-2 outline-none flex flex-col overflow-y-auto'>
          {formattedDescription.map((line, index) => (
            <span key={index} className='block sm:hidden'>
              {truncateDescription(line)}
            </span>
          ))}
          {formattedDescription.map((line, index) => (
            <span key={index} className='hidden sm:block'>
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransformViewCard;