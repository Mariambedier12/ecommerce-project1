'use client'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, registerSchemaForm } from '@/schema/register.schema'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Register() {

  const router = useRouter();

  const form = useForm<registerSchemaForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }
  })

  async function onSubmit(data: registerSchemaForm) {
    try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.message === 'success') {
        toast.success('Account created successfully!');
        router.push('/auth/login');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch {
      toast.error('Error creating account');
    }
  }

  return (
    <div>
      <h2 className="my-5 text-center">Register Now:</h2>
      <Form {...form}>
        <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onSubmit)} >

          <FormField name='name' control={form.control} render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name='email' control={form.control} render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>email</FormLabel>
              <FormControl>
                <div>
                  <Input type='email' {...field} />
                  <p>{field.value}</p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name='password' control={form.control} render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>password</FormLabel>
              <FormControl><Input type='password' autoComplete='off' {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name='rePassword' control={form.control} render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>repassword</FormLabel>
              <FormControl><Input type='password' autoComplete='off' {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name='phone' control={form.control} render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>phone</FormLabel>
              <FormControl><Input type='phone' {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button className='bg-main text-white my-5 ml-auto block cursor-pointer'>Register</Button>

        </form>
      </Form>
    </div>
  )
}
