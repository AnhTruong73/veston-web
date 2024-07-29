import { useEffect, useRef, useState } from 'react';

import Modal from '@/components/ui/Modal';
import PencilIcon from '@/components/ui/PencilIcon';

const ImageProfile = ({ imgsrc, setValue }) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  // setAvatarUrl(imgsrc);
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    setAvatarUrl(imgSrc);
    setValue('imgsrc', imgSrc);
  };
  useEffect(
    (e) => {
      setValue('imgsrc', imgsrc);
      setAvatarUrl(imgsrc);
    },
    [imgsrc]
  );

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
        />
        <button
          type="button"
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>
      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageProfile;
