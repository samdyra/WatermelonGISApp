/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { memo, useState } from 'react';
import s from './sidebar.module.scss';
import Image from 'next/image';
import openlogo from '../../../public/openlogo.svg';
import { type MenuItemsType } from '~/pages';

interface IProps {
  children?: React.ReactNode;
  menuItems?: MenuItemsType;
  setMenuIndex: React.Dispatch<React.SetStateAction<number>>;
  menuIndex: number;
}

const SideBar = (props: IProps) => {
  const { setMenuIndex, menuIndex } = props;
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen2 = () => setIsOpen2(!isOpen2);
  const handleOpen = () => setIsOpen(!isOpen);

  const handleOpenIndex = (index: number, isSelected: boolean) => {
    setMenuIndex(index);

    if (!isSelected) {
      setIsOpen(true);
    }

    if (isSelected) {
      setIsOpen(!isOpen);
    }
  };

  const styleSideMenuActive = {
    width: '390px',
    left: isOpen2 ? '100px' : '200px',
  };
  const styleSideMenu = { width: '100px', left: isOpen2 ? '0' : '100px' };
  const wrapper2Style = isOpen ? styleSideMenuActive : styleSideMenu;

  return (
    <>
      <div className={s.wrapper} style={{ width: isOpen2 ? '100px' : '200px' }}>
        {props.menuItems?.map((item, index) => {
          const isSelected = index === menuIndex;

          if (isOpen2) {
            if (isSelected) {
              return (
                <div className="mx-auto mb-5" key={item.name}>
                  <div
                    className={`${s.logostyleactive} text-bold mx-auto flex w-fit flex-col items-center justify-center border-orange-400 p-[4px]`}
                  >
                    <Image
                      src={item.icon}
                      alt="logo"
                      className="brightness-70 h-[35px] w-[35px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
                      onClick={() => handleOpenIndex(index, isSelected)}
                    />
                  </div>
                  <p className="text-center text-sm font-semibold text-white">{item.name}</p>
                </div>
              );
            }

            return (
              <div className="mx-auto mb-5" key={item.name}>
                <div
                  className={`${s.logostyle} text-bold mx-auto flex w-fit flex-col items-center justify-center p-[4px]`}
                  key={item.name}
                >
                  <Image
                    src={item.icon}
                    alt="logo"
                    className="brightness-70 h-[35px] w-[35px] cursor-pointer transition-all duration-150 ease-linear active:opacity-80"
                    onClick={() => handleOpenIndex(index, isSelected)}
                  />
                </div>
                <p className="text-center text-sm font-semibold text-white">{item.name}</p>
              </div>
            );
          }

          if (isSelected) {
            return (
              <button
                className="text-bold flex  w-full items-center justify-center bg-blue-500 py-2 font-semibold text-white"
                key={item.name}
                onClick={() => handleOpenIndex(index, isSelected)}
              >
                {item.name}
                <br></br>
                {item.label}
              </button>
            );
          }

          return (
            <button
              className="flex w-full items-center justify-center py-2 font-semibold text-white hover:bg-blue-500"
              key={item.name}
              onClick={() => handleOpenIndex(index, isSelected)}
            >
              {item.name}
              <br></br>
              {item.label}
            </button>
          );
        })}

        <button className={s.openButton1} style={{ right: isOpen ? '-410px' : '-20px' }} onClick={handleOpen}>
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
        {isOpen && (
          <h1 className="mb-2 pl-4 text-2xl font-bold text-white ">{`${props?.menuItems?.[menuIndex]?.name}:
        ${props?.menuItems?.[menuIndex]?.label}`}</h1>
        )}

        {isOpen ? props.children : null}
      </div>
    </>
  );
};

export default memo(SideBar);
