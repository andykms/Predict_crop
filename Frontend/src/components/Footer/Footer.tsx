import { ReactNode } from 'react';
import styles from './Footer.module.scss';

export interface FooterProps {
  children: ReactNode;
  aboutProjectText: string;
}

export const Footer = (props: FooterProps) => {
  const {children, aboutProjectText} = props;

  return (
    <footer className={styles.footerContainer}>
      <nav className={styles.footerLinksContainer}>
        {children}
      </nav>
      <h3 className={styles.footerAboutProjectText}>
        {aboutProjectText}
      </h3>
    </footer>
  )
}