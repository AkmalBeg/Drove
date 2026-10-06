import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/Input.jsx'
import { UserIcon, MailIcon,LockIcon } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx'
import { Link } from 'react-router-dom';

const Login = ({ mode = "login" }) => {
    const isRegister = mode === "register";
    const navigate = useNavigate();
    const { login, register } = useApp();
    const [form, setform] = useState({ name: "", email: "", password: "" });
    const [isloading, setIsloading] = useState(false);
    const Updatedfield = (key, value) => setform((prev) => ({ ...prev, [key]: value }));

    const handlesubmit = async (e) => {
e.preventDefault();
        setIsloading(true);
        const ok = isRegister ? await register(form.name, form.email, form.password) 
        : await login(form.email, form.password);
        setIsloading(false);
        if (ok) navigate("/")
    }

        return (

            <div className="min-h-screen text-zinc-900 flex flex-col md:flex-row" >
                {/*left panel*/}
                <div className="md:w-1/2 p-8 md:p-12 lg:p-16 bg-linear-to-br from-orange-50
via-zinc-100 to-red-50 border-b md:border-b-0 md:border-r border-zinc-200 flex
 flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/')] "></div>
                    <div className="relative z-10 flex item-center gap-3">
                        <img src="/logo.svg" alt="logo" className="max-h-9" />
                        <span className="text-4xl font-medium uppercase text-zinc-900">Drove</span>
                    </div>
                    <div className="relative z-10 my-12 space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-zinc-900
    leading-tight">Secure, Simple, and Fast <br />
                            <span className="text-orange-600">Cloud Storage</span></h2>
                        <p className=" text-sm md:text-base text-zinc-600 max-w-md leading-relaxed">
                            Store your files with confidence and access them from anywhere, anytime. Our cloud storage solution offers top-notch security, seamless file management, and lightning-fast performance, ensuring your data is always safe and readily available.
                        </p>
                    </div>

                    <div className="relative z-10 text-sm text-zinc-500">
                        Copyright © 2026 Drove. All rights reserved.
                    </div>

                </div>
                {/*right panel*/}
                <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">

                    <div className="w-full max-w-md space-y-6 animate-fade-in">
                        <div>
                            <h3 className='text-2xl font-medium text-zinc-900'>{isloading ? "Creating Account..." : "Welcome!"}</h3>
                            <p className=' text-sm text-zinc-500 mt-1'>
                                {isRegister ? "Create your account to get started." : "Sign in to access your files."}
                            </p>
                        </div>

                        <form onSubmit={handlesubmit} className='space-y-4'>
                            {isRegister && (
                                <Input
                                    label="Name"
                                    icon={UserIcon}
                                    placeholder="Akmal Beg"
                                    value={form.name}
                                    onChange={(e) => Updatedfield("name", e.target.value)}
                                    required
                                />


                            )}

                            <Input
                                label="Email"
                                type="email"
                                icon={MailIcon}
                                placeholder="akmal@example.com"
                                value={form.email}
                                onChange={(e) => Updatedfield("email", e.target.value)}
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                icon={LockIcon}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => Updatedfield("password", e.target.value)}
                                required
                            />

                            <Button type="submit" variant="primary" className="w-full py-3"
                                isloading={isloading}>
                                <span className="font-medium text-base">
                                    {isRegister ? "Register Account" : "Sign In"}
                                </span>

                            </Button>
                        </form>
                        <div className="text-center pt-2">
                            {
                                isRegister ? (
                                    <p className="text-center pt-3">
                                        Already have an account? {""}
                                        <Link to="/login" className="text-orange-600 font-medium hover:underline">Sign In</Link>
                                    </p>
                                ) : (
                                    <p className="text-center pt-3">
                                        Don't have an account? {""}
                                        <Link to="/register" className="text-orange-600 font-medium hover:underline">Register</Link>
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }


export default Login;