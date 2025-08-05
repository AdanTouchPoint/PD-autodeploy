import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import { animateScroll as scroll } from "react-scroll";
import { fetchRepresentatives } from "../assets/petitions/fetchRepresentatives";
import LoadingMainForm from "./LoadingMainForm";
import { useStateContext } from "../context/StateContext";
const UserInfoForm = () => {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [validatedForm, setValidatedForm] = React.useState(false);
  const [errorForm, setErrorForm] = React.useState(false);
  const [showLoadSpin, setShowLoadSpin] = React.useState(false);

  const [error, setError] = React.useState(false);
  const {
    dataUser,
    setDataUser,
    setMp,
    setSenator,
    clientId,
    backendURLBase,
    endpoints,
    mainData,
    setActiveSection,

  } = useStateContext();

  const title = mainData.mainform?.title?.text;
  const instructions = mainData.mainform?.instructions?.text;

  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };

  const handleTerms = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  const isValidEmail = (email) => {
    if (!email) {
      return false;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email.trim());
  };
    const validateFields = () => {
    if (termsAccepted === false) {
      return false;
    }
    if (!mainData.mainform?.mainFormInputs) {
      return true; 
    }
    for (const field of mainData.mainform.mainFormInputs) {
      let fieldName;
      if (field.type === 'state') {
        fieldName = field.type;
      } else {
        fieldName = field.text === "name" ? "userName" : field.text === "email" ? "emailUser" : field.text;
      }
      const value = dataUser[fieldName];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return false;
      }
      if (fieldName === 'emailUser' && !isValidEmail(value)) {
        return false;
      }
    }
    return true;
  };

  const click = async (e) => {
    e.preventDefault();
   
    if (!validateFields()) {
      setError(true);
      return;
    }    
    setValidatedForm(true);
    setErrorForm(false);
    setShowLoadSpin(true);
    fetchRepresentatives(
      backendURLBase,
      endpoints,
      clientId,
      dataUser.postalcode,
      setMp,
      setSenator,
      setShowLoadSpin
    ).catch((error) => console.log("error", error));
    setActiveSection('listSection');
    scroll.scrollToBottom();
  };

  return (
    <div className={"container container-content"}>
      {errorForm ? (
        <Alert variant={"danger"}>
          Please fill all fields. Also, please make sure there are no spaces
          before of after your email or postcode.
        </Alert>
      ) : null}
      <Form
        name="fm-find"
        onSubmit={click}
        noValidate
        validated={validatedForm}
      >
        <div className="instructions-container">
          <h3 className="main-texts-color main-text-title">{title}</h3>
          <p className="main-texts-color main-text-instruction">
            {instructions}
          </p>
        </div>
        <div className="fields-form">
          {mainData.mainform?.mainFormInputs?.map((field, key) => {
            const fieldText = field.text;
            return field.text !== "state" ? (
              <Form.Group className="field" key={key}>
                <Form.Label
                  className="select-label main-texts-color labels-text-format"
                  htmlFor={`emailInput-mainForm${key}`}
                >
                  {field.text}*
                </Form.Label>
                <Form.Control
                  id={`emailInput-mainForm${key}`}
                  type={"text"}
                  placeholder={field.placeholder}
                  name={
                    field.text === "name"
                      ? "userName"
                      : field.text === "email"
                      ? "emailUser"
                      : field.text
                  }
                  defaultValue={
                    field.text === 'name'
                      ? dataUser.userName
                      : field.text === "email"
                      ? dataUser.emailUser
                      : dataUser[fieldText]
                  }
                  onChange={handleChange}
                  className="input-color main-form-inputs"
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group className={"field"} key={key}>
                <Form.Label className="select-label">
                  {field.text}*
                </Form.Label>
                <Form.Select
                  aria-label="DefaulValue"
                  required
                  name={field.text}
                  id="stateSelect-mainForm"
                  onChange={handleChange}
                >
                  <option key={"vacio"} value={""}>
                    {field.placeholder}
                  </option>
                  {/* Assuming states is available in context or passed as prop */}
                  {/* {states.sort().map((estate) => (
                    <option key={estate} value={estate}>
                      {estate}
                    </option>
                  ))}
                 */}
                </Form.Select>
              </Form.Group>
            );
          })}
        </div>
        <Form.Group
          style={{ textAlign: "justify" }}
          className="field select-styles-form terms-and-cond-input"
          controlId="conditions"
        >
          <Form.Check
            name="conditions"
            onClick={handleTerms}
            className="links-checkboxes-color terms-and-cond-input"
            required
            defaultValue={mainData?.tac}
            label={
              <a
                target={"_blank"}
                className="links-checkboxes-color"
                rel={"noreferrer"}
                href={mainData.tac}
              >
                Terms and Conditions
              </a>
            }
          />
        </Form.Group>
        <Form.Group className="main-find-btn-container">
          <Button
            id="findButton-mainForm"
            type={"submit"}
            variant={"dark"}
            size={"lg"}
            onClick={click}
            className={"u-full-width capitalize-style find-btn-main-form"}
          >
            Continue
          </Button>
        </Form.Group>
        {showLoadSpin ? loading("spinner-containerB") : null}
      </Form>
    </div>
  );
};

export default UserInfoForm;