import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
background: #ffffff;
padding: 2rem;
min-width: 300px;
max-width: 500px;
border-radius: 5px;
box-shadow: 5px 5px #000000;
text-align: center;
@media (prefers-color-scheme: dark) {
  background-color: #242424;
}
`;

const Message = styled.div`
  margin-bottom: 2rem;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;

  ${props => props.variant === 'primary' ? `
    background: #ff8011;
    color: white;

    &:hover {
      background: #fc7500ff;
    }
  ` : `
    background: #6c757d;
    color: white;

    &:hover {
      background: #545b62;
    }
  `}

  &:focus {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }
`;

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel"
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalBox>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
        </ButtonContainer>
      </ModalBox>
    </ModalOverlay>
  );
};

export default ConfirmModal;
