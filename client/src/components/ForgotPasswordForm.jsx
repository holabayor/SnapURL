import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { FaSpinner } from 'react-icons/fa';
import { signupUser } from '@/api/apiService';
import { forgotPasswordFormSchema } from '@/utils';

const ForgotPasswordForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your email address</FormLabel>
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

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full px-5 rounded-[6px] text-base"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
