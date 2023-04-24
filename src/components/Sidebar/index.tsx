import React, { memo, useState } from 'react';
import s from './sidebar.module.scss';
import Image from 'next/image';
import openlogo from '../../../public/openlogo.svg';

const SideBar = () => {
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen2 = () => setIsOpen2(!isOpen2);
  const handleOpen = () => setIsOpen(!isOpen);

  const styleSideMenuActive = {
    width: '250px',
    left: isOpen2 ? '100px' : '200px',
  };
  const styleSideMenu = { width: '100px', left: isOpen2 ? '0' : '100px' };
  const wrapper2Style = isOpen ? styleSideMenuActive : styleSideMenu;

  return (
    <>
      <div className={s.wrapper} style={{ width: isOpen2 ? '100px' : '200px' }}>
        <button className={s.openButton1} style={{ right: isOpen ? '-270px' : '-20px' }} onClick={handleOpen}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={openlogo}
            alt="open-icon"
            width={10}
            height={10}
            className={isOpen ? s.icon1_active : s.icon1}
            loading={'lazy'}
          />
        </button>
        <button className={s.openButton2} onClick={handleOpen2}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={openlogo}
            alt="open-icon"
            className={!isOpen2 ? s.icon1_active : s.icon1}
            width={10}
            height={10}
            loading={'lazy'}
          />
        </button>
      </div>
      <div className={s.wrapper2} style={wrapper2Style}></div>
    </>
  );
};

export default memo(SideBar);
