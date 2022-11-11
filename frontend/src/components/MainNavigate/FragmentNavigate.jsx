import React from "react";
import { NavLink } from "react-router-dom";
import style from './MainNavigate.module.css'

const FragmentNavigate = (props) => {
    return (
        <NavLink
            to={props.path}
            className={({ isActive }) =>
                isActive ? style.active : undefined
            }>{props.name}
        </NavLink>

    );
};

export default FragmentNavigate;