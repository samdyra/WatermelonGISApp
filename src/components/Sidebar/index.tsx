import React, { memo, useState } from 'react';
import s from './sidebar.module.scss';
import Image from 'next/image';
import openlogo from '../../../public/openlogo.svg';

interface IProps {
  children?: React.ReactNode;
  menuItems?: { name: string }[];
}

const SideBar = (props: IProps) => {
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen2 = () => setIsOpen2(!isOpen2);
  const handleOpen = () => setIsOpen(!isOpen);

  const styleSideMenuActive = {
    width: '300px',
    left: isOpen2 ? '100px' : '260px',
  };
  const styleSideMenu = { width: '100px', left: isOpen2 ? '0' : '100px' };
  const wrapper2Style = isOpen ? styleSideMenuActive : styleSideMenu;

  return (
    <>
      <div className={s.wrapper} style={{ width: isOpen2 ? '100px' : '200px' }}>
        {props.menuItems?.map((item) => (
          <button
            className="text-bold flex h-10 w-full items-center justify-center text-white hover:bg-blue-500"
            key={item.name}
            onClick={handleOpen}
          >
            {item.name}
          </button>
        ))}

        <button className={s.openButton1} style={{ right: isOpen ? '-320px' : '-20px' }} onClick={handleOpen}>
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
      <div className={`${s.wrapper2 ?? ''} bg-gray-600`} style={wrapper2Style}>
        {props.children}
      </div>
    </>
  );
};

export default memo(SideBar);
