import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useContactos from '../Service/APIlogin';
import LoginCSS from '../css/Login.module.css';
import LoginBlackCSS from '../css/LoginBlack.module.css'
import { SpinnerCircular } from 'spinners-react';



export default function SignIn() {

  const usuarioJson = sessionStorage.getItem('user');
  const usuario = usuarioJson ? JSON.parse(usuarioJson) : null;

  const location = useLocation();
  const isShopPage = location.pathname === '/shop';


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


 
  
  const contactos = useContactos();
  // if(usuario!=null || !usuario==[]){
  // console.log(usuario[0].name)}

  
 

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const response = await contactos(email, password);
    setIsLoading(false);

    if (!response) {
      setShowError(true);
    };
  };



const renderSpinner = () => {
  if (isLoading) {
    return (
      <div className={LoginCSS["spinner-wrapper"]}>
        <SpinnerCircular color='#003de3' />
      </div>
    );
  }
  return null;
};

  // const handleLogout = () => {
  //   sessionStorage.clear();
  //   window.location.reload();
  // }

  if (!usuario) {

    return (

      <div className={`${LoginCSS.loginContainer}  ${isShopPage ? LoginBlackCSS.loginContainer : ''}`}>

        <h1 className={`${LoginCSS.h1} ${isShopPage ? LoginBlackCSS.h1 : ''}`}>Iniciar Sesión</h1>

        {showError && <p>Email o contraseña inválidos.</p>}

        <form className={`${LoginCSS.form} ${isShopPage ? LoginBlackCSS.form : ''}`} onSubmit={handleSubmit}>
          <div className={`${LoginCSS.inputContainer} ${isShopPage ? LoginBlackCSS.inputContainer : ''}`}>
          {renderSpinner()}
          <input
              className={`${LoginCSS.input} ${isShopPage ? LoginBlackCSS.input : ''}`}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className={`${LoginCSS.span} ${isShopPage ? LoginBlackCSS.span : ''}`}>E-mail *</span>
          </div>
          <div className={`${LoginCSS.inputContainer} ${isShopPage ? LoginBlackCSS.loginContainer : ''}`}>
            <input
              className={`${LoginCSS.input} ${isShopPage ? LoginBlackCSS.input : ''}`}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className={`${LoginCSS.span} ${isShopPage ? LoginBlackCSS.span : ''}`}>Password *</span>
          </div>
          <div>
            <label className={`${LoginCSS.checkbox} ${isShopPage ? LoginBlackCSS.checkbox : ''}`}>
              <input className={`${LoginCSS.inputcb} ${isShopPage ? LoginBlackCSS.inputcb : ''}`} type="checkbox" value="remember" />
              Recuérdame
            </label>
          </div>
          <button className={`${LoginCSS.btn} ${isShopPage ? LoginBlackCSS.btn : ''}`} type="submit">INICIAR SESIÓN</button>
          <div className={`${LoginCSS.centeredContainer} ${isShopPage ? LoginBlackCSS.centeredContainer : ''}`}>
            <Link className={`${LoginCSS.link} ${isShopPage ? LoginBlackCSS.link : ''}`} align="center" href="#" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className={`${LoginCSS.centeredContainer} ${isShopPage ? LoginBlackCSS.centeredContainer : ''}`}>
            <p className={`${LoginCSS.p} ${isShopPage ? LoginBlackCSS.p : ''}`}>¿No tienes cuenta? ‎</p>
            <Link style={{ color: '#0645AD' }} to="/registro">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className={`${LoginCSS.loginContainer} ${isShopPage ? LoginBlackCSS.loginContainer : ''}`}>
        {/* <form onSubmit={handleLogout}>
          <div className={`${LoginCSS.loginContainer}`}>
            <Link className={`${LoginCSS.link}`} to="/profile">
              Mi Perfil
            </Link>

            <button className={`${LoginCSS.link}`} type="button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </form> */}
      </div>
    );
  }
}
