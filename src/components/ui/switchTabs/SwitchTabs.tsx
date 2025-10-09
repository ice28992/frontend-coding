'use client';

type SwitchTabsProps = {
  selecteTab: 'total' | 'young' | 'productive' | 'elderly';
  setSelecteTab: (tab: 'total' | 'young' | 'productive' | 'elderly') => void;
};

export default function SwitchTabs({ selecteTab, setSelecteTab }: SwitchTabsProps) {
  // ボタンの背景色を返す関数
  const getTabBgColor = (key: string) => {
    if (key === 'total') return 'bg-red-300';
    if (key === 'young') return 'bg-blue-300';
    if (key === 'productive') return 'bg-green-300';
    if (key === 'elderly') return 'bg-yellow-300';
    return '';
  };

  return (
    <div className="p-4">
      <div className="flex space-x-2 mb-4">
        {(['total', 'young', 'productive', 'elderly'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setSelecteTab(key)}
            className={`px-4 py-2 rounded-t font-bold ${getTabBgColor(key)} ${
              selecteTab === key ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {{
              total: '総人口',
              young: '年少人口',
              productive: '生産年齢人口',
              elderly: '老年人口',
            }[key]}
          </button>
        ))}
      </div>
    </div>
  );
}
