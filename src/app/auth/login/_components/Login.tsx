'use client'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, loginSchemaForm } from '@/schema/login.schema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'
import Link from 'next/link'





export default function Login() {

  const router = useRouter();

  const form = useForm<loginSchemaForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {

      email: '',
      password: ''

    }
  })

  const firstError = Object.keys(form.formState.errors)[0];

  async function onSubmit(data: loginSchemaForm) {

    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false, // نتحكم احنا في التنقل
      })

      if (res?.error) {
        toast.error('Incorrect email or password')
      } else {
        toast.success('Login successful!')
        router.push('/')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong')
    }

  }

  function handleGitHubSignIn() {
    signIn('github', { callbackUrl: '/' })
  }

  return (

    <div>

      <h2 className="my-5 text-center">Login Now:</h2>
      <Form {...form}>
        <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onSubmit)} >



          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>email</FormLabel>
                <FormControl>

                  <Input type='email' {...field} />

                </FormControl>
                {firstError == 'email' && <FormMessage />}
              </FormItem>
            )}
          />

          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-5">
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type='password' autoComplete='off' {...field} />
                </FormControl>
                {firstError == 'password' && <FormMessage />}


                <div className="text-right mt-2">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>


              </FormItem>
            )}



          />






          <Button className='bg-main text-white my-6 m-auto block cursor-pointer text-center w-120 '>Login</Button>

        </form>
      </Form>



      <div className='text-center my-4'>
        <Button className='w-120 cursor-pointer bg-black text-white ' onClick={handleGitHubSignIn}>Login with Github <i className='fa-brands fa-github'></i> </Button>
      </div>

    </div>

  )
}

