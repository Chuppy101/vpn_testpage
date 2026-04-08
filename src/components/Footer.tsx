import type { ReactNode } from 'react';
import type { FooterListItem } from '../data/pageData';
import { footerColumns, footerCopyright, footerSupport } from '../data/pageData';
import { Button } from './Button';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <FooterColumn heading={<Logo compact />} items={footerColumns.brand} />
        <FooterColumn title="Скачать" items={footerColumns.downloads} withIcons />
        <FooterColumn title="Способы оплаты" items={footerColumns.payments} withIcons />

        <div className="footer__column">
          <div className="footer__heading">
            <h4 className="footer__title">Поддержка 24/7</h4>
          </div>

          <Button variant="support" icon={footerSupport.button.icon}>
            {footerSupport.button.label}
          </Button>

          <div className="footer__links">
            {footerSupport.documents.map((item) => (
              <Button key={item.label} className="footer__link footer__link--document">
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">{footerCopyright}</div>
    </footer>
  );
}

type FooterColumnProps = {
  title?: string;
  heading?: ReactNode;
  items: FooterListItem[];
  withIcons?: boolean;
};

function FooterColumn({ title, heading, items, withIcons = false }: FooterColumnProps) {
  return (
    <div className="footer__column">
      <div className="footer__heading">{heading ?? <h4 className="footer__title">{title}</h4>}</div>

      <div className="footer__links">
        {items.map((item) => (
          <Button
            key={item.label}
            className="footer__link"
            icon={withIcons ? item.icon : undefined}
            iconPosition="start"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
