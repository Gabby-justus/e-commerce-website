
import { useContext, useState } from "react";   
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Auth() {
    const[mode, setMode] = useState('signup');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user, signUp, logIn, logOut} = useContext(AuthContext);

    const {register, handleSubmit, reset, formState: {errors}} =useForm();

    function onSubmit(data) {
        setError(null);
        let result;
        
        if (mode === 'signup') {
            result = signUp(data.email, data.password);
        } else {
            result = logIn(data.email, data.password);
        }
        if (result.success) {
            navigate("/");
        } else {
            setError(result.message);
            reset();
        }
    }

    return <div className="page">
                <div className="container">
                    <div className="auth-container">
                        {user && <p>Welcome, {user.email}!</p>}
                        <button onClick={() => logOut()}>Log Out</button>
                        <h1 className="page-title">
                            {mode === 'signup' ? 'Sign Up' : 'Log In'}
                            </h1>
                            
                        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

                            {error && <div className="error-message">{error}</div>}

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input className="form-input" type="email" id="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                               
                                {errors.email?.type==="required" && <p className="form-error">Email is required</p>}
                                {errors.email?.type === "pattern" && <p className="form-error">Invalid email address</p>}
                            </div>
                            

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input className="form-input" type="password" id="password" {...register("password", { required: "Password is required", 
                                minLength: {
                                    value: 6, 
                                    message: "Password must be at least 6 characters long"
                                }, 
                                maxLength: {
                                    value: 12, 
                                    message: "Password must be less than 12 characters long"
                                }
                                })}/>

                                {errors.password && <p className="form-error">{errors.password.message}</p>}
                            </div>
                            <button className="btn btn-primary btn-large" type="submit">{mode === 'signup' ? 'Sign Up' : 'Log In'}</button>
                        </form>
                        <div className="auth-switch">
                           {mode === "signup" ? (
                                <p>Already have an account? {" "}<span className="auth-link" onClick={() => setMode('login')}>Log in</span></p>
                            ) : (
                                <p>Don't have an account?{" "} <span className="auth-link" onClick={() => setMode('signup')}>Sign up</span></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
}