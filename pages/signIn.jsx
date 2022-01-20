import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/client";

export default function SignIn () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        if (email.trim() === "" || password.trim() === "") {
            setHasError(true)
            setErrorMessage("Please provide all fields..");
            return;
        }
        try {
            signIn("credentials", {
                email,
                password,
                callbackUrl: `${window.location.origin}/booking`,
                redirect: false
            }).then(function (result) {
                if (result.error !== null) {
                    if (result.status === 401) {
                        setIsLoading(false)
                        setHasError(true)
                        setErrorMessage("Invalid Credentials..");
                    }
                    else {
                        setIsLoading(false)
                        setHasError(true)
                        setErrorMessage(result.error);
                    }
                }
                else {
                    setIsLoading(true)
                    router.push(result.url);
                }
            })
        } catch (error) {
            this.setState({ error: error });
        }
    }
    return(
        <div className="w-screen h-screen bg-gray-100">
            <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col gap-6 text-center p">
                    <p className="text-4xl font-bold">Cal.com</p>
                    <p className="text-4xl font-bold">Sign in to your account</p>
                    <div className="flex flex-col gap-4 px-16 py-10 text-lg text-left bg-white">
                        <div className="flex flex-col">
                            <label className="font-semibold">Email Address</label>
                            <input type="email" name="" id="" className="p-1 my-2 border-2 w-96" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                            <label className="font-semibold">Password</label>
                            <p className="font-semibold">Forget?</p>
                            </div>
                            <input type="email" name="" id="" className="p-1 my-2 border-2 w-96"  value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <button className="flex justify-center py-2 text-white bg-black" onClick={onSubmit}>
                        {
                                isLoading ?
                                    'Loading...' : 'Sign In'

                            }
                        </button>
                    </div>
                    <Link href='/signUp'><p className="my-4 text-center pointer">{`Don't have an account?`} <span className="font-semibold">Create an account</span></p></Link>
                    {
                        hasError ?
                            <p className="text-center text-red-600">{errorMessage}</p>
                            : ''
                    }
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}