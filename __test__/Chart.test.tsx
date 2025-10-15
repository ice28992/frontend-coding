import { render, screen, waitFor } from '@testing-library/react';
import Chart from '@/components/ui/chart/Chart';

// Highchartsへのデータ渡し
jest.mock('highcharts-react-official', () => {
  return jest.fn(({ options }) => (
    <div data-testid="mock-chart">
      <h2>{options.title.text}</h2>
    </div>
  ));
});

// APIレスポンスを模倣したモックデータ
const MOCK_PREFECTURES = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 13, prefName: '東京都' },
];

const MOCK_DATA_TOKYO = {
  message: null,
  result: {
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: [
          { year: 2015, value: 13515271 },
          { year: 2020, value: 13951636 },
        ],
      },
    ],
  },
};

// fetch APIをグローバルにモック化
global.fetch = jest.fn((url) => {
  if (url.toString().includes('/prefectures')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ result: MOCK_PREFECTURES }),
    }) as Promise<Response>;
  }
  if (url.toString().includes('/population/composition/perYear')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(MOCK_DATA_TOKYO),
    }) as Promise<Response>;
  }
  return Promise.reject(new Error(`Unhandled fetch mock for URL: ${url}`));
});

describe('Chart Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  // 都道府県選択済みのテストケース
  test('都道府県が選択された場合：データ取得・グラフの表示', async () => {
    render(<Chart selectedPrefCodes={[13]} selectedTab={0} boderColor="" />);
  
    await waitFor(() => {
      expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
    });

    // API呼び出し確認
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/prefectures'),
      expect.any(Object)
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/population/composition/perYear?prefCode=13'),
      expect.any(Object)
    );
  });

  // 都道府県未選択のテストケース
  test('都道府県が未選択の場合：選択を促すメッセージの表示・グラフ非表示', async() => {
    render(<Chart selectedPrefCodes={[]} selectedTab={0} boderColor="" />);

    await screen.findByText('グラフを表示するには都道府県を選択してください');
    expect(screen.queryByTestId('mock-chart')).not.toBeInTheDocument();
  });
});