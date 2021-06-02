import React from "react";
import {
  Label,
  InputGroup,
  Input,
  ErrorMessage,
  ValidationIcon,
} from "../elements/Formularios";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Inputs = ({
  usuario,
  setUsuario,
  type,
  label,
  placeholder,
  name,
  messageError,
  regex,
  validarPassword2,
}) => {
  const onChange = (e) => {
    setUsuario({ ...usuario, campo: e.target.value });
  };

  const validation = () => {
    if (regex) {
      if (regex.test(usuario.campo)) {
        setUsuario({ ...usuario, valido: "true" });
      } else {
        setUsuario({ ...usuario, valido: "false" });
      }
    }
    if (validarPassword2) {
      validarPassword2();
    }
  };

  return (
    <div>
      <Label htmlFor={name} valido={usuario.valido}>
        {label}
      </Label>
      <InputGroup>
        <Input
          type={type}
          placeholder={placeholder}
          id={name}
          value={usuario.campo}
          onChange={onChange}
          onKeyUp={validation}
          onBlur={validation}
          valido={usuario.valido}
        />
        <ValidationIcon
          icon={usuario.valido === "true" ? faCheckCircle : faTimesCircle}
          valido={usuario.valido}
        />
      </InputGroup>
      <ErrorMessage valido={usuario.valido}>{messageError}</ErrorMessage>
    </div>
  );
};

export default Inputs;
