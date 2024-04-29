import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { FaSpinner } from 'react-icons/fa';
import { signupUser } from '@/api/apiService';
import { SignupFormSchema } from '@/utils';
import toast from 'react-hot-toast';

const SignupForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const { errors } = form.formState;

  const handleSubmit = async (data) => {
    try {
      onSubmit(true);
      await signupUser(data);
      form.reset();
      onSubmit(false); // Resets the form to initial defaultValues after successful submission
    } catch (error) {
      onSubmit(false, error);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>First Name</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="First Name"
                    {...field}
                    className={errors.firstName ? 'border-destructive' : ''}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Last Name</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    {...field}
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full px-5 rounded-sm text-base"
          >
            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Signup'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
