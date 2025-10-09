'use client';

import { useState } from 'react';
import SwitchTabs from '@/components/ui/switchTabs/SwitchTabs';
import Chart from '@/components/ui/charts/Chart';

export default function Page() {
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  const [selectedTabs, setSelectedTabs] = useState<number>(0);

  return (
    <main>
      <SwitchTabs 
        checkPrefs={setSelectedPrefs} 
        selectedTabs={selectedTabs}
        setSelectedTabs={setSelectedTabs}
      />
      <Chart 
        selectedPrefCodes={selectedPrefs} 
        selectedTab={selectedTabs}
      />
    </main>
  );
}
