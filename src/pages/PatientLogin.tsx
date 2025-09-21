import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PatientLogin = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo
    if (formData.userId && formData.password) {
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto">
            <div className="form-healthcare">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Patient Login</h1>
                <p className="text-muted-foreground">Access your medical records securely</p>
              </div>

              {loginSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 animate-scale-in">
                  ✓ Login Successful! Welcome back.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-foreground mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    className="input-healthcare"
                    placeholder="Enter your User ID"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-healthcare pr-12"
                      placeholder="Enter your password"
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

                <button
                  type="submit"
                  className="btn-healthcare w-full"
                >
                  Login
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  New user?{' '}
                  <Link
                    to="/patient-register"
                    className="text-primary hover:text-healthcare-turquoise font-medium transition-colors"
                  >
                    Register here
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

export default PatientLogin;