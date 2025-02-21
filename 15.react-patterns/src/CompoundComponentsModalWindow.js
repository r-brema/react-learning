import React, { cloneElement } from "react";
import { useState, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useDetectOutsideClick from "./hooks/useDetectOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalCtx = createContext();

const CompoundComponentsModalWindow = ({ children }) => {
  const [openModalName, setOpenModalName] = useState("");
  const show = setOpenModalName;
  const close = () => setOpenModalName("");
  return (
    <ModalCtx.Provider value={{ openModalName, show, close }}>
      {children}
    </ModalCtx.Provider>
  );
};

function Open({ children, opens: opensWindowsName }) {
  const { show } = useContext(ModalCtx);
  console.log(show);
  return cloneElement(children, {
    onClick: () => show(opensWindowsName),
  });
}
function Window({ children, name }) {
  const { openModalName, close } = useContext(ModalCtx);
  const modalRef = useDetectOutsideClick(close, true);
  if (openModalName !== name) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <span>X</span>
        </Button>

        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

CompoundComponentsModalWindow.Open = Open;
CompoundComponentsModalWindow.Window = Window;
export default CompoundComponentsModalWindow;
