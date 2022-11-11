import React from "react";
import FragmentNavigate from "./FragmentNavigate";
import style from './MainNavigate.module.css'

const MainNavigate = (props) => {
    return (
        <header className={style.main_navigation}>
            <div className={style.main_navigation_logo}>
                <h1>Events</h1>
            </div>
            <nav className={style.main_navigation_items}>
                <ul>
                    <li><FragmentNavigate path='/auth' name='Auntefication' /></li>
                    <li><FragmentNavigate path='/events' name='Events' /></li>
                    <li><FragmentNavigate path='/bookings' name='Bookings' /></li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigate;