'use client';

import { useEffect, useState } from 'react';
import styles from './PrefectureList.module.css';

type Prefecture = {
  prefCode: number;
  prefName: string;
};

type Props = {
  selectChange: (selected: number[]) => void;
};

const getPrefData = async () => {
  const response = await fetch(
    'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures',
    {
      headers: {
        'X-API-KEY':  process.env.NEXT_PUBLIC_API_KEY || '',
      },
    }
  );
  const data = await response.json();
  return data.result;
};

export function PrefectureList({ selectChange } : Props) {
  const [pref, setPref] = useState<Prefecture[]>([]);
  const [selectPref, setSelectPref] = useState<number[]>([]);
  const [allSelecte, setAllSelecte] = useState(false);

  useEffect(() => {
    const getPref = async () => {
      try {
        const data = await getPrefData();
        setPref(data);
      } catch (error) {
        console.error('都道府県データの取得に失敗しました', error);
      }
    };
    getPref();
  }, []);

  useEffect(() => {
    selectChange(selectPref);
  }, [selectPref, selectChange]);

  const handleCheckAll = () => {
    if (allSelecte) {
      setSelectPref([]);
    } else {
      setSelectPref(pref.map((p) => p.prefCode));
    }
    setAllSelecte(!allSelecte);
  };

  const handlePrefChange = (prefCode: number) => {
    setSelectPref((prev) =>
      prev.includes(prefCode)
        ? prev.filter((id) => id !== prefCode)
        : [...prev, prefCode]
    );
  };

  return (
    <div>
      <div className={styles.prefCardHead}>
        <h2 className={styles.textBox}>都道府県一覧</h2>
        <button onClick={handleCheckAll} className={styles.checkAll}>
          {allSelecte ? '全解除' : '全選択'}
        </button>
      </div>

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
