import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { api } from "~/utils/api";
import Link from 'next/link';
import router from 'next/router';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Required'),
});

export default function Login() {

    const loginMutation = api.user.login.useMutation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values: { email: string, password: string }) => {
            const result = await loginMutation.mutateAsync(values);
            console.log(result)
            
            if (result.success) {
                try {
                  await new Promise((resolve) => setTimeout(resolve, 1000)); 
              
                  router.push('/preference').catch((err)=> console.log(err)); 
                } catch (error) {
             
                  alert('Login failed');
                }
              } else {
                alert(result.message);
              }
        },
    });

    return (
        <div className="max-w-md w-full space-y-8 bg-white">
            <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-2xl shadow-sm border-2 border-grey1 -space-y-px gap-4 flex flex-col p-10">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <div>
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className={`w-full border-2 border-solid border-grey1 sm:text-sm p-3 rounded-md ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                                }`}
                            placeholder="Email address"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-600 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className={`w-full border-2 border-solid border-grey1 sm:text-sm p-3 rounded-md ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-600 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none"
                    >Login
                    </button>
                    <div className='flex flex-row justify-center'>
                        <span>
                            Dont have an account? &nbsp;

                            <Link href="/regristrationPage" className="font-medium text-black">
                                SIGN UP
                            </Link>
                        </span>
                    </div>
                </div>

            </form>

        </div>
    );
}

