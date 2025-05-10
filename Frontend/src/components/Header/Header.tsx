import { wheatLogo,authorizationIcon } from '../Svg/Svg';
import styles from './Header.module.scss';

export interface FooterProps {
  isAuth: boolean,
  linkMainSite: string,
  onClickEntrance: ()=> void;
  onClickExit: ()=> void;
}

export const Header = (props: FooterProps)=> {
  const {isAuth, linkMainSite, onClickEntrance, onClickExit} = props;
  
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.headerNavigation}>
        <a className={styles.headerMainSiteLink} href={linkMainSite}>
          {wheatLogo}
        </a>
        <nav className={styles.headerAuthContainer}>
          {isAuth? 
            <span className={styles.headerAuthText}>{"Выйти"}</span> :
            <span className={styles.headerAuthText}>{"Войти"}</span>
          } 
          <a className={styles.headerAuthIcon}>
            {authorizationIcon}
          </a>
        </nav>
      </nav>
      <h1 className={styles.headerNameSite}>
          {"Нейросеть урожайности пшеницы"}
      </h1>
    </header>
  )
}