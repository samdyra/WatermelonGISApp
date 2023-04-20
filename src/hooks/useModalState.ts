import { type SetStateAction, useState } from 'react';

/**
 * Hooks for modal state
 * @param {Bool} initialState default modal state
 * @returns
 */

type IModalState = [
  isModalVisible: boolean,
  handleShowModal: () => void,
  handleHideModal: () => void,
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>
];

const useModalState = (initialState = false): IModalState => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(initialState);

  function handleShowModal(): void {
    setIsModalVisible(true);
  }

  function handleHideModal(): void {
    setIsModalVisible(false);
  }

  return [isModalVisible, handleShowModal, handleHideModal, setIsModalVisible];
};

export default useModalState;
