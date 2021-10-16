import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { find, get } from "lodash";

import { getAppLanguage } from "./storage";
import { languages } from "./index";

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: {
    email: "Email",
    password: "Password",
    username: "Username",
    selectYourLanguage: "Select your language",
    search: "Search",
    loginButton: "Log In",
    fullName: "Full Name",
    signUpButton: "Sign Up",
    nextButton: "Next",
    forgotLoginText: "Forgot your login details?",
    getLoginHelp: "Get help logging in",
    or: "Or",
    loginWithFacebook: "Log In with Facebook",
    preSignUpText: "Don't have an account?",
    signUp: "Sign up",
    signUpWithEmailOrPhone: "Sign up with email or phone number",
    preLogInText: "Already have an account?",
    footerLogIn: "Log in",

    English: "English",
    Spanish: "Spanish",
  },
  sp: {
    email: "Correo eléctronico",
    password: "Contraseña",
    username: "Nombre de usuario",
    selectYourLanguage: "Selecciona tu idioma",
    search: "Busca",
    loginButton: "Entrar",
    fullName: "Nombre completo",
    signUpButton: "Registrate",
    nextButton: "Siguiente",
    forgotLoginText: "¿Has olvidado tus datos de incio de sesión?",
    getLoginHelp: "Obtén ayuda",
    or: "O",
    loginWithFacebook: "Iniciar sesión con Facebook",
    preSignUpText: "¿No tienes una cuenta?",
    signUp: "Registrate",
    signUpWithEmailOrPhone:
      "Resgistrate con tu correo electrónico o número de teléfono",
    preLogInText: "Ya tienes una cuenta?",
    footerLogIn: "Inicia sesión",

    English: "Ingles",
    Spanish: "Espanol",
  },
};
// Set the locale once at the beginning of your app.
i18n.locale = "en";

const translation = (key) => {
  return i18n.t(key);
};

export const getCurrentLanguage = () => {
  return get(find(languages, { id: i18n.currentLocale() }), "language");
};

export default translation;
