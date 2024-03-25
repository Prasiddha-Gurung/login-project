import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { api } from "~/utils/api";
import Link from 'next/link';
import router from 'next/router';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(1, '1 char')
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Required'),
});


export default function Registration() {
    const [loading, setLoading] = useState(false)
    const registerMutation = api.user.registration.useMutation();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values: { email: string, name: string, password: string }) => {
            const result = await registerMutation.mutateAsync(values);
            setLoading(true)
            if (result.id) {
                try {
                  await new Promise((resolve) => setTimeout(resolve, 1000)); 
              
                  router.push('/otpPage').catch((err)=> console.log(err)); 
                } catch (error) {
            
                    setLoading(false)
                    alert('Registration Failed');
                }
              } else {
                setLoading(false)
                alert('Registration Failed');
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
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            className={`w-full border-2 border-solid border-grey1 sm:text-sm p-3 rounded-md ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                                }`}
                            placeholder="Name"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-xs text-red-500">{formik.errors.name}</div>
                        ) : null}
                    </div>
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
                    >Create Account
                    </button>
                    <div className='flex flex-row justify-center'>
                        <span>
                            Already have an account? &nbsp;

                            <Link href="/login" className="font-medium text-black">
                                Login
                            </Link>
                        </span>
                    </div>
                </div>

            </form>

        </div>
    );
}

