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
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleClick = (value: string, index: number) => {
    setPlaceholder(value);
    setIsOpen(false);
    setHighlightedIndex(index);
  };

  const labelClick = () => {
    if (dropdownRef.current) dropdownRef.current.focus();
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => (prev < list.length - 1 ? prev + 1 : 0));
        }
        break;

      case 'ArrowUp':
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : list.length - 1));
        }
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        } else {
          setPlaceholder(list[highlightedIndex]);
          setIsOpen(false);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    const handleClickBackdrop = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };

    document.addEventListener('click', handleClickBackdrop);

    return () => {
      document.removeEventListener('click', handleClickBackdrop);
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
            placeholder !== initialValue && css.chosen,
            isOpen && css.isOpen
          )}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          type="button"
        >
          <span>
            {symbol && placeholder !== initialValue
              ? `${placeholder} ${symbol}`
              : placeholder}
          </span>
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
                    placeholder === value && css.chosen,
                    highlightedIndex === index && css.focus
                  )}
                  onClick={() => handleClick(value, index)}
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
