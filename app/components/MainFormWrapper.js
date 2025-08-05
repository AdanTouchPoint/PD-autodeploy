"use client";
import React, { useState, useEffect } from "react";
import MainForm from "./MainForm";
import LoadingMainForm from "./LoadingMainForm";
import { StateContext } from "../context/StateContext";

const MainFormWrapper = ({ initialData }) => {
  const [emailData, setEmailData] = useState({ userName: "" });
  const [dataUser, setDataUser] = useState({});
  const [err, setErr] = useState(false);
  const [mp, setMp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [senator, setSenator] = useState([]); 
  const [many, setMany] = useState(false);
  const [activeSection, setActiveSection] = useState('mainform');
  // Set initial data from props
  const [mainData, setMainData] = useState(initialData.mainData);
  const [colors, setColors] = useState(initialData.colors);
  const [typData, setTypData] = useState(initialData.typData);
  const [allDataIn, setAllDataIn] = useState([]);
  const [tweet,setTweet] = useState('test tweet');

  const { backendURLBase, backendURLBaseServices, id, campaignType, clientId, endpoints } = initialData;

  useEffect(() => {
    setDataUser({ ...dataUser, projectId: id });
    // Apply colors to documentElement style
    if (colors && Object.keys(colors).length !== 0) {
      document.documentElement.style.setProperty("--main-bg-color", colors.backgroundColor);
      document.documentElement.style.setProperty("--main-texts-color", colors.textColor);
      document.documentElement.style.setProperty("--main-inputs-bg-color", colors.inputBackground);
      document.documentElement.style.setProperty("--main-option-text-and-border-color", colors.inputTextColor);
      document.documentElement.style.setProperty("--links-checkbox-somebtns-color", colors.linkColor);
      document.documentElement.style.setProperty("--primary-btn-bg-color", colors.buttonColor);
      document.documentElement.style.setProperty("--primary-btn-font-color", colors.buttonTextColor);
      document.documentElement.style.setProperty("--back-btns-bg-color", colors.buttonBColor);
      document.documentElement.style.setProperty("--back-btns-font-color", colors.buttonBTextColor);
    }
    setLoading(false);
  }, [colors]);

  return (
    <StateContext.Provider value={{

    emailData,
    setEmailData,
    dataUser,
    setDataUser,
    backendURLBase,
    backendURLBaseServices,
    clientId,
    id,
    campaignType,
    endpoints,
    err,
    setErr,
    mainData,
    setMainData,
    typData,
    setTypData,
    loading,
    setLoading,
    colors,
    setColors,
    senator,
    setSenator,
    mp,
    setMp,
    setActiveSection,
    activeSection,
    setMany,
    many,
    allDataIn,
    setAllDataIn,
    tweet,
    setTweet
  }}>
      {loading && <LoadingMainForm cl={"spinner-container"} />}
      {!loading && <MainForm />}
    </StateContext.Provider>
  );
};

export default MainFormWrapper;
