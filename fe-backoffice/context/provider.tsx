"use client";
import {
  IAvailableLanguages,
  availableLanguages,
} from "@/config/available-languages";
import { createContext, useContext, useState } from "react";
import { ERoleLevel } from "./enums";

type initialStateType = {
  languageInUse: IAvailableLanguages | undefined;
  setLanguageInUse: React.Dispatch<React.SetStateAction<IAvailableLanguages | undefined>>;
  roleLevel: ERoleLevel;
  setRoleLevel: React.Dispatch<React.SetStateAction<ERoleLevel>>;
};

const initialState: initialStateType = {
  languageInUse: undefined,
  setLanguageInUse: () => { },
  roleLevel: ERoleLevel.USER,
  setRoleLevel: () => { },
};

const Context = createContext<initialStateType>(initialState);

export const useAppContext = () => {
  return useContext(Context);
};

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [languageInUse, setLanguageInUse] = useState<IAvailableLanguages | undefined>();

  const [roleLevel, setRoleLevel] = useState<ERoleLevel>(ERoleLevel.USER);

  const value = {
    languageInUse,
    setLanguageInUse,
    roleLevel,
    setRoleLevel,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
