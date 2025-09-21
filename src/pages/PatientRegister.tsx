import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PatientRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    aadhaar: '',
    userId: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [generatedUserId, setGeneratedUserId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAadhaarVerification = () => {
    if (formData.aadhaar.length === 12) {
      setAadhaarVerified(true);
      const userId = Math.floor(10000000 + Math.random() * 90000000).toString();
      setGeneratedUserId(userId);
      setFormData({ ...formData, userId });
      setTimeout(() => setStep(2), 1500);
    }
  };

  const handleAccountCreation = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      alert('Account created successfully!');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto">
            <div className="form-healthcare">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">New Patient Registration</h1>
                <p className="text-muted-foreground">Join our secure healthcare platform</p>
              </div>

              {/* Step 1: Aadhaar Verification */}
              {step === 1 && (
                <div className="animate-fade-up">
                  <div className="mb-6">
                    <label htmlFor="aadhaar" className="block text-sm font-medium text-foreground mb-2">
                      Aadhaar ID
                    </label>
                    <input
                      type="text"
                      id="aadhaar"
                      name="aadhaar"
                      value={formData.aadhaar}
                      onChange={handleChange}
                      className="input-healthcare"
                      placeholder="Enter your 12-digit Aadhaar ID"
                      maxLength={12}
                      required
                    />
                  </div>

                  {aadhaarVerified && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 animate-scale-in">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2" size={20} />
                        <div>
                          <div className="font-medium">Aadhaar Verified!</div>
                          <div className="text-sm">Your unique User ID is: {generatedUserId}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleAadhaarVerification}
                    disabled={formData.aadhaar.length !== 12 || aadhaarVerified}
                    className="btn-healthcare w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {aadhaarVerified ? 'Verified ✓' : 'Verify Aadhaar'}
                  </button>
                </div>
              )}

              {/* Step 2: Password Setup */}
              {step === 2 && (
                <div className="animate-fade-up">
                  <form onSubmit={handleAccountCreation} className="space-y-6">
                    <div>
                      <label htmlFor="userId" className="block text-sm font-medium text-foreground mb-2">
                        User ID (Generated)
                      </label>
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        className="input-healthcare bg-muted cursor-not-allowed"
                        readOnly
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                        Set Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="input-healthcare pr-12"
                          placeholder="Create a secure password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="input-healthcare pr-12"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-healthcare w-full"
                    >
                      Create Account
                    </button>
                  </form>
                </div>
              )}

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link
                    to="/patient-login"
                    className="text-primary hover:text-healthcare-turquoise font-medium transition-colors"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PatientRegister;