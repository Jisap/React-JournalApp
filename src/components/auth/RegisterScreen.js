//npm i validator

import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);         // Obtenemos el state de los mensajes de error

    const [formValues, handleInputChange] = useForm({
        name: 'nando',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'                              // Estado inicial de nuestro formulario de register
    });

    const { name , email, password, password2 } = formValues 

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {

        if(name.trim().length === 0){
            dispatch(setError('Name is required'));
            console.log('Name is required');
            return false;
        }else if (!validator.isEmail(email)){
            dispatch(setError('Email is required'))
            console.log('Email is not valid');
            return false;
        }else if (password !== password2 || password.length<5){
            dispatch(setError('Password debe tener al menos 6 caracteres y ser iguales'))
            console.log('Password debe tener al menos 6 caracteres y ser iguales');
            return false
        }

        dispatch(removeError());

        return true;
    }


    return (
        <div>
            <h3 className="auth__title">Register</h3>
                <form 
                    onSubmit={ handleRegister }
                    className="animate__animated animate__fadeIn animate__faster"    
                >

                { 
                    msgError &&                                         // Si existe un mensaje de error mostramos esta alerta
                        ( 
                            <div className="auth__alert-error">
                                {msgError}
                            </div>
                        )    
                }

                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        className="auth__input"
                        autoComplete="off"
                        value={ name }
                        onChange={ handleInputChange }
                    />

                    <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        value={ email }
                        onChange={ handleInputChange }
                    />

                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        className="auth__input"
                        value={ password }
                        onChange={ handleInputChange }
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="password2"
                        className="auth__input"
                        value={ password2 }
                        onChange={ handleInputChange }
                    />

                    <button 
                        className="btn btn-primary btn-block mb-5"
                        type="submit"
                    >
                        Register
                    </button>

                    

                    <Link to="/auth/login"
                          className="link">
                        Already register ?
                    </Link>

                </form>
        </div>
    )
}
