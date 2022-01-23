import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignUp (){
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [isLoading, setIsLoading] = useState('')
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter();

    const onSubmit = async (e) => {
        
        e.preventDefault();
        e.stopPropagation();
        console.log('trying')
        setIsLoading(true)
        setErrorMessage(false)
        e.preventDefault();
        if (email.trim() === "" || username.trim() === "" || password.trim() === "") {
            setHasError(true)
            setIsLoading(false)
            setErrorMessage("Please provide all fields..");
            return;
        }

        try {
            const response = await axios.post('/api/user/signup', {
                username,
                email,
                password,
            })
            if (response.data.status == 200) {
                console.log("Successful")
                router.push(result.url);
                signIn("credentials", {
                    email,
                    password,
                    callbackUrl: `${window.location.origin}/booking`,
                    redirect: false
                }).then(function (result) {
                    console.log("result")
                    if (result.error !== null) {
                        console.log('erros')
                        console.log(result)
                        if (result.status === 400) {
                            setIsLoading(false)
                            setHasError(true)
                            setErrorMessage("User already existsss");
                        }
                        else {
                            setIsLoading(false)
                            setHasError(true)
                            setErrorMessage(result.error);
                        }
                    }
                    else {
                        console.log("redirecting")
                        router.push(result.url);
                    }
                })
            }
        } catch (error) {
            setIsLoading(false)
            setHasError(true)
            // setErrorMessage("user Already existasass");
        }
    }

    return(
        <div className="w-screen h-screen">
            <div className="flex items-center justify-center w-full h-full px-80">
                <div className="grid grid-cols-2 gap-64">
                    <div className="flex flex-col gap-8">
                        <p className="text-4xl font-semibold">Cal.com</p>
                        <p className="text-6xl font-semibold">{`You're one step away from simpler scheduling`}</p>
                        <p className="text-gray-500">{`“I love being able to use a tool that just works, and that is open source. As a developer, I love being empowered to contribute to a tool that I use regularly.”`}</p>
                        <div className="flex items-center gap-2">
                            <div className="">
                                <div className="p-5 bg-gray-600 rounded-full"></div>
                            </div>
                            <div>
                                <p>Cassidy Williams <span className="text-blue-400">@cassidoo</span></p>
                                <p className="text-gray-400">Director of Developer Experience at Netlify</p>
                            </div>
                        </div>
                    </div>
                    <div className="border ">
                        <div className="flex flex-col gap-6 p-8">
                            <div>
                                <p className="text-2xl font-bold">Start your 14-day free trial</p>
                                <p className="text-gray-500"><span className="font-bold">No credit card required.</span> Try all pro features for 14 days. Upgrade at any time to Pro for $12/month.</p>
                            </div>
                            <div className="flex items-center w-full border"> </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex w-full">
                                    <p className="px-4 py-2 bg-gray-100 border">cal.com/</p>
                                    <input type="text" name="" id="" className="w-full px-4 py-2 border" placeholder="Username" value={username} onChange={e=>setusername(e.target.value)} />
                                </div>
                                <input type="email" name="" id="" className="w-full px-4 py-2 border" placeholder="Email" value={email} onChange={e=>setemail(e.target.value)} />
                                <input type="password" name="" id="" className="w-full px-4 py-2 border" placeholder="********" value={password} onChange={e=>setpassword(e.target.value)} />
                                <button className="flex justify-center py-2 text-white bg-black " onClick={onSubmit}>
                                {
                                    isLoading ?
                                        'Loading...' : 'Register'

                                }
                                </button>
                            </div>
                            
                            <Link href='/signIn'><p className="my-4 text-center pointer">All ready have an account? Login</p></Link>
                            {
                                hasError? 
                                <p className="text-center text-red-600">{errorMessage}</p> : ''
                            }
                        </div>
                        <div className="p-8 bg-gray-100">
                            <p className="text-sm text-gray-500">By signing up, you agree to our <span className="font-semibold text-gray-800">Terms of Service</span> and <span className="font-semibold text-gray-800">Privacy Policy</span>. Need help? <span className="font-semibold text-gray-800">Get in touch.</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}