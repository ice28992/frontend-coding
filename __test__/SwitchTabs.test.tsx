import { render, screen, fireEvent } from '@testing-library/react';
import { PrefectureList } from '@/components/ui/prefectureList/PrefectureList';
import SwitchTabs from '@/components/ui/switchTabs/SwitchTabs';
import React from 'react';

jest.mock('@/components/ui/prefctureList/PrefectureList', () => ({
  PrefectureList: jest.fn(({ selectChange }) => (
    <div
      data-testid="mock-prefecture-list"
      data-select-change={selectChange ? 'present' : 'missing'}
    />
  )),
}));

const MockedPrefectureList = PrefectureList as jest.Mock;

// テストで使用するモック関数を定義
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
  });

  // タブ切り替えテスト
  test('タブを選択：setSelectedTabs呼び出し', () => {
    render(<SwitchTabs {...defaultProps} />);

    const juniorTab = screen.getByRole('button', { name: '年少人口' });
    fireEvent.click(juniorTab);
    expect(mockSetSelectedTabs).toHaveBeenCalledWith(1);

    const seniorTab = screen.getByRole('button', { name: '老年人口' });
    fireEvent.click(seniorTab);
    expect(mockSetSelectedTabs).toHaveBeenCalledWith(3);
  });

  // PrefectureListからのデータ受け取りテスト
  test('都道府県選択データ取得：checkPrefsが呼び出し', () => {
    render(<SwitchTabs {...defaultProps} />);
    expect(screen.getByTestId('mock-prefecture-list')).toBeInTheDocument();

    const selectedData = [1, 13, 47];
    const selectChangeHandler =
      MockedPrefectureList.mock.calls[0][0].selectChange;
    selectChangeHandler(selectedData);

    expect(mockCheckPrefs).toHaveBeenCalledWith(selectedData);
    expect(mockCheckPrefs).toHaveBeenCalledTimes(1);
  });
});
