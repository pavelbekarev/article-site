import React from "react";
import "../style.scss";

export const Header = () => {
  return (
    <header className="header container">
      <div className="header__navigation">
        <ul className="header__navigation__menu">
          <li className="header__navigation__menu__item">Портфолио</li>
          <li className="header__navigation__menu__item">Блог</li>
          <li className="header__navigation__menu__item">О нас</li>
        </ul>
      </div>

      <div className="header__contacts">
        <h1 className="header__contacts__text">+7(999)999-99-99</h1>
        <span className="header__contacts__text">Заказать статью</span>
      </div>
    </header>
  );
};
