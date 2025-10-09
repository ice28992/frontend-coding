'use client';

import { useState } from 'react';
import styles from './SwitchTabs.module.css';
import { PrefectureList } from '../prefctureList/PrefectureList';

const SwitchTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSwitchTab = (id: number) => {
    setSelectedTab(id);
  };

  const tabColor = () => {
    switch (selectedTab) {
      case 0: return styles['card-red'];
      case 1: return styles['card-blue'];
      case 2: return styles['card-green'];
      case 3: return styles['card-yellow'];
      default: return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Tab */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles['tab-red']}`} onClick={() => handleSwitchTab(0)}>総人口</button>
          <button className={`${styles.tab} ${styles['tab-blue']}`} onClick={() => handleSwitchTab(1)}>年少人口</button>
          <button className={`${styles.tab} ${styles['tab-green']}`} onClick={() => handleSwitchTab(2)}>生産年齢人口</button>
          <button className={`${styles.tab} ${styles['tab-yellow']}`} onClick={() => handleSwitchTab(3)}>老年人口</button>
        </div>

        {/* Card */}
        <div className={`${styles.card} ${tabColor()}`}>
          <PrefectureList selectedTab={selectedTab} />
        </div>
      </div>
    </div>
  );
};

export default SwitchTabs;
