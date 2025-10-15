import { render } from '@testing-library/react';
import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer';

describe('Header Component', () => {
  it('ヘッダーコンポーネントのレンダリングテスト', async () => {
    render(<Header />);
  });
});

describe('Footer Component', () => {
  it('フッターコンポーネントのレンダリングテスト', async () => {
    render(<Footer />);
  });
});
