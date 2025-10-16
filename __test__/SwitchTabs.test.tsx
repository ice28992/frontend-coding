import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrefectureList } from '@/components/ui/prefectureList/PrefectureList';
import SwitchTabs from '@/components/ui/switchTabs/SwitchTabs';
import React from 'react';

jest.mock('@/components/ui/prefectureList/PrefectureList', () => ({
  PrefectureList: jest.fn(({ selectChange, defaultPrefs }) => (
    <div
      data-testid="mock-prefecture-list"
      data-select-change={selectChange ? 'present' : 'missing'}
      data-default-prefs={JSON.stringify(defaultPrefs)}
    />
  )),
}));

const MockedPrefectureList = PrefectureList as jest.Mock;

describe('SwitchTabs Component', () => {
  const mockCheckPrefs = jest.fn();
  const mockSetSelectedTabs = jest.fn();
  const defaultProps = {
    checkPrefs: mockCheckPrefs,
    selectedTabs: 0,
    setSelectedTabs: mockSetSelectedTabs,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    MockedPrefectureList.mockClear(); 
  });

  // 全てのクリックイベントを userEvent.click に置き換えて act 警告を解消
  test('タブを選択：setSelectedTabs呼び出し', async () => {
    const user = userEvent.setup();
    render(<SwitchTabs {...defaultProps} />);

    const juniorTab = screen.getByRole('button', { name: '年少人口' });
    await user.click(juniorTab);
    expect(mockSetSelectedTabs).toHaveBeenCalledWith(1);

    const seniorTab = screen.getByRole('button', { name: '老年人口' });
    await user.click(seniorTab);
    expect(mockSetSelectedTabs).toHaveBeenCalledWith(3);
  });

  test('都道府県選択データ取得：checkPrefsが呼び出し', async () => {
 
    render(<SwitchTabs {...defaultProps} />);
    expect(screen.getByTestId('mock-prefecture-list')).toBeInTheDocument();

    const selectedData = [1, 13, 47];
    const selectChangeHandler = MockedPrefectureList.mock.calls[0][0].selectChange;
    
    // act() でラップして状態更新を同期的に処理
    await act(() => {
        selectChangeHandler(selectedData);
    });

    expect(mockCheckPrefs).toHaveBeenCalledWith(selectedData);
    expect(mockCheckPrefs).toHaveBeenCalledTimes(1);
  });

  test('トグルボタンでカードが開閉', async () => {
    const user = userEvent.setup();
    render(<SwitchTabs {...defaultProps} />);
    const toggleButton = screen.getByRole('button', { name: '' });

    // 初期状態: 開いている
    let prefectureList = screen.getByTestId('mock-prefecture-list');
    expect(prefectureList).toBeInTheDocument();

    // 閉じる
    await user.click(toggleButton);
    expect(screen.queryByTestId('mock-prefecture-list')).not.toBeInTheDocument();

    // 開く
    await user.click(toggleButton);
    prefectureList = screen.getByTestId('mock-prefecture-list');
    expect(prefectureList).toBeInTheDocument();
  });

  test('カード開閉後：選択状態維持・PrefectureListにデータ渡し', async () => {
    const user = userEvent.setup();
    render(<SwitchTabs {...defaultProps} />);
    const toggleButton = screen.getByRole('button', { name: '' });
    const initialSelectedData = [4, 13, 27];

    // 初期状態：defaultPrefsは空配列であることを確認
    expect(MockedPrefectureList.mock.calls[0][0].defaultPrefs).toEqual([]);

    // 選択：SwitchTabsの内部状態を更新
    const selectChangeHandler = MockedPrefectureList.mock.calls[0][0].selectChange;
    
    await act(() => {
      selectChangeHandler(initialSelectedData);
    });

    // カードを閉じる
    await user.click(toggleButton); 
    expect(screen.queryByTestId('mock-prefecture-list')).not.toBeInTheDocument();
    
    // カードを開く
    await user.click(toggleButton); 
    const secondMountCallProps = MockedPrefectureList.mock.calls.slice(-1)[0][0];
    expect(secondMountCallProps.defaultPrefs).toEqual(initialSelectedData);

    const reMountedPrefList = screen.getByTestId('mock-prefecture-list');
    expect(reMountedPrefList.getAttribute('data-default-prefs')).toBe(JSON.stringify(initialSelectedData));
  });
});
