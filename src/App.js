import React, { useState } from "react";
//Elements
import {
  Formulario,
  Label,
  TermsContainer,
  ButtonCenterContainer,
  Button,
  ExitoMessage,
  ErrorMessageSubmit,
} from "./elements/Formularios";
//Components
import Inputs from "./components/Inputs";
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [password, setPassword] = useState({ campo: "", valido: null });
  const [password2, setPassword2] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [terminos, setTerminos] = useState(false);
  const [formularioValido, setFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        setPassword2((prev) => {
          return { ...prev, valido: "false" };
        });
      } else {
        setPassword2((prev) => {
          return { ...prev, valido: "true" };
        });
      }
    }
  };

  const onChangeTerminos = (e) => {
    setTerminos(e.target.checked);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      setFormularioValido(true);
      setUsuario({campo: '', valido: null});
      setNombre({campo: '', valido: null});
      setPassword({campo: '', valido: null});
      setPassword2({campo: '', valido: null});
      setCorreo({campo: '', valido: null});
      setTelefono({campo: '', valido: null});    
      setTerminos(false)  
    } else {
      setFormularioValido(false);
    }
  };

  return (
    <main>
      <Formulario action="" onSubmit={submitHandler}>
        <Inputs
          type="text"
          label="Usuario"
          usuario={usuario}
          setUsuario={setUsuario}
          placeholder="nico123"
          name="usuario"
          messageError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo"
          regex={expresiones.usuario}
        />

        <Inputs
          type="text"
          label="Nombre"
          usuario={nombre}
          setUsuario={setNombre}
          placeholder="Nicolas Ramirez"
          name="nombre"
          messageError="Los nombres tienen que ser de 1 a 40 caracteres, pueden llevar letras, espacios y acentos"
          regex={expresiones.nombre}
        />

        <Inputs
          type="password"
          label="Contraseña"
          usuario={password}
          setUsuario={setPassword}
          name="password1"
          messageError="La contraseña tiene que ser de 4 a 12 digitos"
          regex={expresiones.password}
        />

        <Inputs
          type="password"
          label="Repetir Contraseña"
          usuario={password2}
          setUsuario={setPassword2}
          name="password2"
          messageError="Las contraseñas no coinciden"
          validarPassword2={validarPassword2}
        />

        <Inputs
          type="email"
          label="Correo electronico"
          usuario={correo}
          setUsuario={setCorreo}
          placeholder="example@gmail.com"
          name="correo"
          messageError="Correo electronico invalido"
          regex={expresiones.correo}
        />

        <Inputs
          type="text"
          label="Teléfono"
          usuario={telefono}
          setUsuario={setTelefono}
          name="telefono"
          messageError="El telefono solo puede contener numeros, ademas debe tener entre 7 y 14 digitos"
          regex={expresiones.telefono}
        />

        <TermsContainer>
          <Label>
            <input
              type="checkbox"
              checked={terminos}
              onChange={onChangeTerminos}
              name="terminos"
              id="terminos"
            />
            Acepto los terminos y condiciones
          </Label>
        </TermsContainer>
        { formularioValido === false && <ErrorMessageSubmit>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <b>ERROR:</b> Por favor rellene el formulario correctamente
          </p>
        </ErrorMessageSubmit>}
        <ButtonCenterContainer>
          <Button type="submit">Enviar</Button>
          { formularioValido === true && <ExitoMessage>Formulario enviado exitosamente!</ExitoMessage>}
        </ButtonCenterContainer>
      </Formulario>
    </main>
  );
}

export default App;
