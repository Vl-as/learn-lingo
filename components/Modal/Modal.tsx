'use client';

import { MouseEvent, ReactNode, useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const backdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  });

  return createPortal(
    <div onClick={backdropClick} className={css.overlay}>
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeButton}>
          <Icon className={css.iconCross} width={32} height={32} name="cross" />
        </button>
        <div className={css.modalInner}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
