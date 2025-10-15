'use client';

import { useState } from 'react';
import { IoIosArrowDropup, IoIosArrowDropdownCircle } from "react-icons/io";
import { PrefectureList } from '../prefctureList/PrefectureList';
import styles from './SwitchTabs.module.css';

type Props = {
  checkPrefs: (selected: number[]) => void;
  selectedTabs: number;
  setSelectedTabs: (id: number) => void;
};

const SwitchTabs = ({ checkPrefs, selectedTabs, setSelectedTabs }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]); 

  const handleSwitchTab = (id: number) => {
    setSelectedTabs(id);
  };

  const handleSelect = (selected: number[]) => {
    setSelectedPrefs(selected); 
    checkPrefs(selected);
  };

  const tabColor = () => {
    switch (selectedTabs) {
      case 0:
        return styles['card-red'];
      case 1:
        return styles['card-blue'];
      case 2:
        return styles['card-green'];
      case 3:
        return styles['card-yellow'];
      default:
        return '';
    }
  };

  const toggleCard = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Tab */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${styles['tab-red']}`}
            onClick={() => handleSwitchTab(0)}
          >
            総人口
          </button>
          <button
            className={`${styles.tab} ${styles['tab-blue']}`}
            onClick={() => handleSwitchTab(1)}
          >
            年少人口
          </button>
          <button
            className={`${styles.tab} ${styles['tab-green']}`}
            onClick={() => handleSwitchTab(2)}
          >
            生産年齢人口
          </button>
          <button
            className={`${styles.tab} ${styles['tab-yellow']}`}
            onClick={() => handleSwitchTab(3)}
          >
            老年人口
          </button>

          <button onClick={toggleCard} className={styles.toggleButton}>
            {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdownCircle />}
          </button>
        </div>

        {/* Card */}
        {isOpen && (
          <div className={`${styles.card} ${tabColor()}`}>
            <PrefectureList selectChange={handleSelect} initialSelectedPrefs={selectedPrefs} isOpen={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SwitchTabs;
