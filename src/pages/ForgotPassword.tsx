import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    // Simulate sending reset email
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setEmailSent(true);
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <div className="flex items-center justify-center min-h-screen pt-20 pb-8">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-eco shadow-eco-lg p-8">
            {!emailSent ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-outfit font-bold text-forest-700 mb-2">Forgot Password?</h1>
                  <p className="text-sage-600">Enter your email to reset your password</p>
                </div>

                {/* Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sage-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-tree-600 hover:bg-tree-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>

                {/* Back to Sign In */}
                <div className="mt-6 text-center">
                  <Link 
                    to="/login" 
                    className="inline-flex items-center text-sage-600 hover:text-tree-600 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-tree-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-tree-600" />
                </div>
                <h1 className="text-2xl font-outfit font-bold text-forest-700 mb-2">Check Your Email</h1>
                <p className="text-sage-600 mb-6">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
                <Link to="/login">
                  <Button className="bg-tree-600 hover:bg-tree-700">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;