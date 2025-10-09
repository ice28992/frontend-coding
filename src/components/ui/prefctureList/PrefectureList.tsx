'use client';
import { useEffect, useState } from 'react';
import styles from './PrefectureList.module.css';

type Prefecture = {
  prefCode: number;
  prefName: string;
};

type SelectTabProps = {
  selecteTab: 'total' | 'young' | 'productive' | 'elderly';
};

// APIから都道府県一覧の取得
const getPrefData = async () => {
  const response = await fetch(
    '***',
    {
      headers: {
        'X-API-KEY': '***',
      },
    }
  );
  const data = await response.json();
  return data.result;
};

export function PrefectureList({ selecteTab }: SelectTabProps) {
  const [pref, setPref] = useState<Prefecture[]>([]);
  const [selectPref, setSelectPref] = useState<number[]>([]);

  // タブごとにカードの色変える
  const switchColor = () => {
    switch (selecteTab) {
      case 'total':
        return styles.RedTab;
      case 'young':
        return styles.BlueTab;
      case 'productive':
        return styles.GreenTab;
      case 'elderly':
        return styles.YellowTab;
      default:
        return '';
    }
  };

  // API呼び出し
  useEffect(() => {
    const fetchPref = async () => {
      try {
        const data = await getPrefData();
        setPref(data);
      } catch (error) {
        console.error('都道府県の取得に失敗しました', error);
      }
    };
    fetchPref();
  }, []);

  // 全選択/全解除処理
  const [allSelecte, setAllSelecte] = useState(false);
  const handleCheckAll = () => {
    if (allSelecte) {
      setSelectPref([]);
    } else {
      setSelectPref(pref.map((p) => p.prefCode));
    }
    setAllSelecte(!allSelecte);
  };

  // 都道府県選択時の処理
  const handlePrefChange = (prefCode: number) => {
    setSelectPref((prev) =>
      prev.includes(prefCode)
        ? prev.filter((id) => id !== prefCode)
        : [...prev, prefCode]
    );
  };

  return (
    <div className={`${styles.prefCard} ${switchColor()}`}>
      <div className={styles.prefCardHead}>
        <h2 className={styles.textBox}>都道府県一覧</h2>
      
        <button onClick={handleCheckAll} className={styles.checkAll}>
          {allSelecte ? '全解除' : '全選択'}
        </button>
      </div>

      {/* 都道府県のチェックボックス表示 */}
      <div className={styles.prefGrid}>
        {pref.map((p) => (
          <label key={p.prefCode} className={styles.prefCheckbox}>
            <input
              type="checkbox"
              checked={selectPref.includes(p.prefCode)}
              onChange={() => handlePrefChange(p.prefCode)}
            />
            {p.prefName}
          </label>
        ))}
      </div>
    </div>
  );
}
