'use client';
import { PrefectureList } from '@/components/ui/prefctureList/PrefectureList';
// import SwitchTabs from '@/components/ui/switchTabs/SwitchTabs';

export default function App() {
  return (
    <div className="root-layout">
      <PrefectureList selecteTab={'total'} />
    </div>
  );
}
