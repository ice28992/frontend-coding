import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrefectureList } from '@/components/ui/prefectureList/PrefectureList';
import '@testing-library/jest-dom';

// APIレスポンスを模倣したモックデータ
const MOCK_PREFECTURES = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森県' },
  { prefCode: 13, prefName: '東京都' },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ result: MOCK_PREFECTURES }),
  })
) as jest.Mock;

describe('PrefectureList Component', () => {
  let selectChangeMock: jest.Mock;
  beforeEach(() => {
    selectChangeMock = jest.fn();
  });

  // 都道府県データ取得・チェックボックスの表示テスト
  test('都道府県データを取得と一覧表示', async () => {
    render(<PrefectureList selectChange={selectChangeMock} defaultPrefs={[]} isOpen={true} />);

    expect(
      screen.getByRole('heading', { name: '都道府県一覧' })
    ).toBeInTheDocument();

    const hokkaidoCheckbox = await screen.findByLabelText('北海道');
    const tokyoCheckbox = await screen.findByLabelText('東京都');
    expect(hokkaidoCheckbox).toBeInTheDocument();
    expect(tokyoCheckbox).toBeInTheDocument();
  });

  // 都道府県ごとに選択・解除可能かテスト
  test('都道府県を選択・解除：selectChangeの呼び出し', async () => {
    const user = userEvent.setup();
    render(<PrefectureList selectChange={selectChangeMock} defaultPrefs={[]} isOpen={true} />);

    const tokyoCheckbox = await screen.findByLabelText('東京都');
    const hokkaidoCheckbox = await screen.findByLabelText('北海道');

    // 東京選択
    await user.click(tokyoCheckbox);
    expect(selectChangeMock).toHaveBeenCalledWith([13]);

    // 北海道選択
    await user.click(hokkaidoCheckbox);
    expect(selectChangeMock).toHaveBeenCalledWith([13, 1]);

    // 東京解除
    await user.click(tokyoCheckbox);
    expect(selectChangeMock).toHaveBeenCalledWith([1]);
  });

  // ボタンで全選択・全解除
  test('ボタン操作で全ての都道府県を選択・全解除できる', async () => {
    const user = userEvent.setup();
    render(<PrefectureList selectChange={selectChangeMock} defaultPrefs={[]} isOpen={true} />);

    // 全選択
    await screen.findByText('北海道');
    const selectAllButton = screen.getByRole('button', { name: '全選択' });
    await user.click(selectAllButton);
    const allPrefCodes = MOCK_PREFECTURES.map((p) => p.prefCode);
    expect(selectChangeMock).toHaveBeenCalledWith(allPrefCodes);

    // 全解除
    const deselectAllButton = screen.getByRole('button', { name: '全解除' });
    expect(deselectAllButton).toBeInTheDocument();
    await user.click(deselectAllButton);
    expect(selectChangeMock).toHaveBeenCalledWith([]);
    expect(screen.getByRole('button', { name: '全選択' })).toBeInTheDocument();
  });
});
