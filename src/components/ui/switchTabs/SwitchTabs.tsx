import styles from './SwitchTabs.module.css';
import { PrefectureList } from '../prefctureList/PrefectureList';

type Props = {
  checkPrefs: (selected: number[]) => void;
  selectedTabs: number;
  setSelectedTabs: (id: number) => void;
};


const SwitchTabs = ({ checkPrefs, selectedTabs, setSelectedTabs } : Props) => {
  const handleSwitchTab = (id: number) => {
    setSelectedTabs(id);
  };

  const handleSelect = (selected: number[]) => {
    checkPrefs(selected);
  };

  const tabColor = () => {
    switch (selectedTabs) {
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
          <PrefectureList selectChange={handleSelect} />
        </div>
      </div>
    </div>
  );
};

export default SwitchTabs;
