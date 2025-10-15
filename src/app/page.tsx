'use client';

import { useState } from 'react';
import SwitchTabs from '@/components/ui/switchTabs/SwitchTabs';
import Chart from '@/components/ui/chart/Chart';
import styles from '@/app/page.module.css';

export default function Page() {
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  const [selectedTabs, setSelectedTabs] = useState<number>(0);
  const boderColor = [
    styles['card-red'],
    styles['card-blue'],
    styles['card-green'],
    styles['card-yellow'],
  ];
  const borderClass = boderColor[selectedTabs] || '';

  return (
    <main>
      <SwitchTabs
        checkPrefs={setSelectedPrefs}
        selectedTabs={selectedTabs}
        setSelectedTabs={setSelectedTabs}
      />
      <Chart
        className={styles.card}
        selectedPrefCodes={selectedPrefs}
        selectedTab={selectedTabs}
        boderColor={borderClass}
      />
    </main>
  );
}
