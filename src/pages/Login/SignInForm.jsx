import { useState } from "react";

import AuthService from "src/services/AuthService";

export default function SignInForm() {

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthService.login(state)
            .then(res => {
                if (res?.data?.message) {
                    console.error(res?.data?.message);
                    let errorMessageElm = document.getElementById('error_msg');
                    errorMessageElm.innerHTML = 'Username or password is incorrected';
                } else if (typeof window != 'undefined') {
                    window.localStorage.setItem('authenticated', 'true');
                    window.localStorage.setItem('data',
                        JSON.stringify({
                            token: res.data,
                            loginTime: Date.now(),
                        })
                    );
                    window.location.href = '/'
                }
            })
            .catch(err => {
                console.error(err);
                let errorMessageElm = document.getElementById('error_msg');
                if (err.code === 'S401') {
                    errorMessageElm.innerHTML = 'Username or password is incorrected';
                }
            })
    };
 

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                <a href="#">Forgot your password?</a>
                <button type="submit">Sign In</button>
                <span id="error_msg"></span>
            </form>
        </div>
    );
}
