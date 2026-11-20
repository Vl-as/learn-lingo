'use client';

import { useEffect, useRef, useState } from 'react';
import css from './Dropdown.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import { Filters } from '@/types/filters';

type FilterKey = 'language' | 'level' | 'price';

interface DropdownProps {
  list: string[];
  initialValue: string;
  className?: string;
  label: string;
  symbol?: string;
  onChange: (value: string, key: FilterKey) => void;
  name: FilterKey;
  filters: Filters;
}

function Dropdown({
  list,
  initialValue,
  label,
  className,
  symbol,
  onChange,
  name,
  filters,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const placeholder = filters[name] !== '' ? filters[name] : initialValue;

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleClick = (value: string, index: number) => {
    setIsOpen(false);
    setHighlightedIndex(index);
    onChange(value, name);
  };

  const labelClick = () => {
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
          const value = list[highlightedIndex];
          setIsOpen(false);
          onChange(value, name);
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
  }, []);

  return (
    <div>
      <label className={css.label} onClick={labelClick} aria-label={label}>
        {label}
      </label>
      <div className={clsx(css.dropdown, className)} ref={dropdownRef}>
        <button
          className={clsx(
            css.mainField,
            placeholder !== initialValue && css.chosen,
            isOpen && css.isOpen
          )}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
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
          <div className={css.listWrapper}>
            <ul className={css.list} role="listbox">
              {list.map((value, index) => (
                <li className={css.listItem} key={value}>
                  <button
                    role="option"
                    aria-selected={placeholder === value}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
