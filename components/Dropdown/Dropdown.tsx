'use client';

import { useEffect, useRef, useState } from 'react';
import css from './Dropdown.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

interface DropdownProps {
  list: string[];
  initialValue: string;
  className?: string;
  label: string;
  symbol?: string;
}

function Dropdown({
  list,
  initialValue,
  label,
  className,
  symbol,
}: DropdownProps) {
  const [placeholder, setPlaceholder] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleClick = (value: string) => {
    setPlaceholder(value);
    setIsOpen(false);
  };

  const labelClick = () => {
    if (dropdownRef.current) dropdownRef.current.focus();
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickBackdrop = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    const handlerKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('click', handleClickBackdrop);
    document.addEventListener('keydown', handlerKeyDown);

    return () => {
      document.removeEventListener('click', handleClickBackdrop);
      document.removeEventListener('keydown', handlerKeyDown);
    };
  });

  return (
    <div>
      <label className={css.label} onClick={labelClick}>
        {label}
      </label>
      <div className={clsx(css.dropdown, className)}>
        <button
          ref={dropdownRef}
          className={clsx(
            css.mainField,
            placeholder !== initialValue && css.chosen
          )}
          onClick={toggleDropdown}
          type="button"
        >
          {symbol && placeholder !== initialValue
            ? `${placeholder} ${symbol}`
            : placeholder}
          <Icon
            width={20}
            height={20}
            className={clsx(css.icon, isOpen && css.reverse)}
            name="arrow-down"
          />
        </button>
        {isOpen && (
          <ul className={css.list}>
            {list.map((value, index) => (
              <li className={css.listItem} key={index}>
                <button
                  className={clsx(
                    css.option,
                    placeholder === value && css.chosen
                  )}
                  onClick={() => handleClick(value)}
                  type="button"
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
