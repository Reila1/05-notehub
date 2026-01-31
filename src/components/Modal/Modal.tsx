import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
              onClose();
          }
      };
      if (isOpen) {
          document.addEventListener('keydown', handleKeyDown);
      }
      return () => {
          document.removeEventListener('keydown', handleKeyDown);
      };
  }, [isOpen, onClose]);
    if (!isOpen) {
        return null;
    }
    return createPortal(
        <div className={css.backdrop} onClick={onClose}>
  <div className={css.modal} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
</div>,
        document.body
    );
}

