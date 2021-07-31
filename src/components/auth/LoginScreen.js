import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Permite navegar entre páginas
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {

    const dispatch = useDispatch()                          // Permite hacer uso de nuestras actions

    const [formValues, handleInputChange] = useForm({
        email: 'nando@gmail.com',
        password: '123456'                                  // Estado inicial de nuestro formulario de login
    })

    const { email, password } = formValues;                 // Valores de nuestro formulario de login
    const {loading} = useSelector( state => state.ui)

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email,password);
        dispatch( startLoginEmailPassword(email, password));    // Usaremos la action login con estos valores simulados peeeero
                                                                // a través de starLoginEmailPassword que simula la validacion de firebase    
    }

    const handleGoogleLogin = () =>{
        dispatch(startGoogleLogin());
    }

    return (
        <div>
            <h3 className="auth__title">Login</h3>
                <form 
                    onSubmit={ handleLogin }
                    className="animate__animated animate__fadeIn animate__faster"
                >
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        value={ email }                     // Valor del email
                        onChange={ handleInputChange }      // Función que cambia el valor del email
                    />

                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        className="auth__input"
                        value={ password }
                        onChange={ handleInputChange }
                    />

                    <button 
                        className="btn btn-primary btn-block"
                        type="submit"
                        disabled = { loading }>
                        Login
                    </button>

                    <div className="auth__social-networks">
                        <p>Login with social Networks</p>
                        <div 
                            className="google-btn"
                            onClick={ handleGoogleLogin }>
                                <div className="google-icon-wrapper">
                                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                                </div>
                                <p className="btn-text">
                                    <b>Sign in with google</b>
                                </p>
                        </div>
                    </div>

                    <Link to="/auth/register"
                          className="link">
                        Create new account
                    </Link>

                </form>
        </div>
    )
}
