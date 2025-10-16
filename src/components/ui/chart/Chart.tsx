'use client';

import React, { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './Chart.module.css';

type Props = {
  className?: string;
  selectedPrefCodes: number[];
  selectedTab: number;
  boderColor: string;
};

type Prefecture = {
  prefCode: number;
  prefName: string;
};

// 型定義(エラー防止)
type DataPoint = {
  year: number;
  value: number;
};
type CategoryData = {
  label: string;
  data: DataPoint[];
};
type ApiResponse = {
  message: null;
  result: {
    boundaryYear: number;
    data: CategoryData[];
  };
};

const tabLabels = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

function Chart({
  className,
  selectedPrefCodes,
  selectedTab,
  boderColor,
}: Props) {
  const [options, setOptions] = useState<Highcharts.Options | null>(null);
  const [prefMap, setPrefMap] = useState<Record<number, string>>({});
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const res = await fetch(
          'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures',
          {
            headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '' },
          }
        );
        const json = await res.json();

        if (json.result && Array.isArray(json.result)) {
          const map: Record<number, string> = {};
          json.result.forEach((pref: Prefecture) => {
            map[pref.prefCode] = pref.prefName;
          });
          setPrefMap(map);
        } else {
          console.error('予期しないデータ形式が返されました:', json.result);
        }
      } catch (err) {
        console.error('都道府県一覧の取得に失敗しました', err);
      }
    };

    fetchPrefectures();
  }, []);

  // グラフデータ取得
  useEffect(() => {
    if (selectedPrefCodes.length == 0 || Object.keys(prefMap).length == 0) {
      setOptions(null);
      return;
    }

    const fetchData = async () => {
      try {
        const promises = selectedPrefCodes.map(
          async (
            prefCode
          ): Promise<{ prefCode: number; data: ApiResponse }> => {
            const response = await fetch(
              `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
              {
                headers: {
                  'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '',
                },
              }
            );

            if (!response.ok)
              throw new Error(`人口データの取得に失敗しました: ${prefCode}`);
            const data = await response.json();
            return { prefCode, data };
          }
        );

        const results = await Promise.all(promises);

        const label = tabLabels[selectedTab];
        const categories = results[0].data.result.data[0].data.map((pt) =>
          pt.year.toString()
        );

        const series = results
          .map(({ prefCode, data }) => {
            const targetData = data.result.data.find((d) => d.label === label);
            if (!targetData) return null;

            return {
              name: prefMap[prefCode] || `都道府県 ${prefCode}`,
              type: 'line',
              data: targetData.data.map((pt) => pt.value),
            } as Highcharts.SeriesOptionsType;
          })
          .filter((s): s is Highcharts.SeriesOptionsType => s !== null);

        setOptions({
          title: {
            text: `${label}の人口推移グラフ`,
          },
          xAxis: {
            categories,
            title: { text: '年度' },
          },
          yAxis: {
            title: { text: '人口数' },
          },
          series: series,
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
              fontSize: '10px',
            },
          },
          accessibility: {
            enabled: false  // アクセシビリティを無効化
          },
        });
      } catch (error) {
        console.error('グラフデータ取得エラー', error);
        setOptions(null);
      }
    };

    fetchData();
  }, [selectedPrefCodes, selectedTab, prefMap]);

  if (!options)
    return (
      <p className={styles.text}>
        グラフを表示するには都道府県を選択してください
      </p>
    );

  return (
    <div className={`${styles.wrapper} ${className ?? ''} ${boderColor}`}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
}

export default Chart;
