import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { FaSpinner } from 'react-icons/fa';
import { loginFormSchema } from '@/utils';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

const LoginForm = ({ onLoginSuccess }) => {
  const all = useAuth();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loading = false;

  const { errors } = form.formState;

  const handleSubmit = async (data) => {
    console.log(all);
    try {
      await login(data);
      onLoginSuccess();
      form.reset();
    } catch (error) {
      toast.error(error.message);
      // console.error('Login failed:', error);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>email</FormLabel> */}
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
            disabled={loading}
            className="w-full px-5 rounded-[6px] text-base"
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
