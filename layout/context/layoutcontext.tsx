import { useState, createContext, useEffect } from "react";
import {
  ChildContainerProps,
  LayoutContextProps,
  LayoutState,
} from "@/types/layout";

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: ChildContainerProps) => {
  const [layoutState, setLayoutState] = useState<LayoutState>({
    menuHideState: false,
    menuMobileHideState: false,
    hoverMenuState: false,
  });

  const onMenuToggle = () => {
    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        menuHideState: false,
      }));
    } else {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        menuMobileHideState: !prevLayoutState.menuMobileHideState,
      }));
    }
  };

  const onMenuHideToggle = () => {
    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        menuHideState: true,
        hoverMenuState: false,
      }));
    } else {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        menuMobileHideState: !prevLayoutState.menuMobileHideState,
      }));
    }
  };

  const onHoverMenuToggle = () => {
    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        hoverMenuState: true,
      }));
    }
  };

  const onHoverMenuHideToggle = () => {
    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        hoverMenuState: false,
      }));
    }
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  useEffect(() => {
    const handleResize = () => {
      if (isDesktop()) {
        setLayoutState((prevState) => ({
          ...prevState,
          menuMobileHideState: false,
        }));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value: LayoutContextProps = {
    layoutState,
    setLayoutState,
    onMenuToggle,
    onMenuHideToggle,
    onHoverMenuToggle,
    onHoverMenuHideToggle,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
