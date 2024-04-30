import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { FaSpinner } from 'react-icons/fa';
import { signupUser } from '@/api/apiService';
import { SignupFormSchema } from '@/utils';

const SignupForm = ({ onSucess, onError }) => {
  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form;
  const { errors } = form.formState;

  const onSubmit = async (data) => {
    try {
      await signupUser(data);
      form.reset();
      onSucess();
      onSubmit(false);
    } catch (error) {
      // console.log('This runs too');
      onError(error);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            disabled={isSubmitting}
            className="w-full px-5 rounded-[6px] text-base"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              'Signup'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
