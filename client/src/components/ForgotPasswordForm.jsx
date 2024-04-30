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
import { forgotPassword } from '@/api/apiService';
import { forgotPasswordFormSchema } from '@/utils';

const ForgotPasswordForm = ({ onSucess, onError }) => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting } = form;
  const { errors } = form.formState;

  const onSubmit = async (email) => {
    try {
      await forgotPassword(email);
      onSucess();
      form.reset();
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
            disabled={isSubmitting}
            className="w-full px-5 rounded-[6px] text-base"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              'Send reset link'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
