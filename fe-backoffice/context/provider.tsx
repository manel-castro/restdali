"use client";
import {
  IAvailableLanguages,
  availableLanguages,
} from "@/config/available-languages";
import { createContext, useContext, useState } from "react";

type initialStateType = {
  languageInUse: IAvailableLanguages;
  setLanguageInUse: React.Dispatch<React.SetStateAction<IAvailableLanguages>>;
};

const initialState: initialStateType = {
  languageInUse: availableLanguages[0],
  setLanguageInUse: () => {},
};

const Context = createContext<initialStateType>(initialState);

export const useAppContext = () => {
  return useContext(Context);
};

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [languageInUse, setLanguageInUse] = useState(availableLanguages[0]);

  const value = {
    languageInUse,
    setLanguageInUse,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
