import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
    return (
        <header className={styles.Header}>
            <ul className={styles.NavList}>
                <li className={styles.NavItem}>
                    <NavLink
                        className={styles.NavLink}
                        activeClassName={styles.NavLinkActive}
                        to="/"
                        exact
                    >
                        Home page

                    </NavLink>
                </li>
                <li className={styles.NavItem}>
                    <NavLink
                        className={styles.NavLink}
                        activeClassName={styles.NavLinkActive}
                        to="/movies" >
                        Movies page
                    </NavLink>
                </li>
            </ul>
        </header>
    )
}

