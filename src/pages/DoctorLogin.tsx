import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'invalid'>('idle');

  // Mock doctor database for demo
  const validDoctors = ['DOC001', 'DOC002', 'DOC123'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validDoctors.includes(formData.doctorId.toUpperCase()) && formData.password) {
      setLoginStatus('success');
      setTimeout(() => {
        setLoginStatus('idle');
        navigate('/doctor-dashboard');
      }, 1500);
    } else if (formData.doctorId && formData.password) {
      setLoginStatus('invalid');
      setTimeout(() => setLoginStatus('idle'), 3000);
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Doctor Login</h1>
                <p className="text-muted-foreground">Access patient records securely</p>
              </div>

              {loginStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 animate-scale-in">
                  ✓ Login Successful! Welcome, Doctor.
                </div>
              )}

              {loginStatus === 'invalid' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 animate-scale-in">
                  <div className="flex items-center">
                    <AlertCircle className="mr-2" size={20} />
                    Doctor ID not valid. Please check your credentials.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="doctorId" className="block text-sm font-medium text-foreground mb-2">
                    Doctor ID
                  </label>
                  <input
                    type="text"
                    id="doctorId"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    className="input-healthcare"
                    placeholder="Enter your Doctor ID"
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
                  New Doctor?{' '}
                  <Link
                    to="/doctor-register"
                    className="text-primary hover:text-healthcare-turquoise font-medium transition-colors"
                  >
                    Register here
                  </Link>
                </p>
              </div>

              {/* Demo hint */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Demo:</strong> Use DOC001, DOC002, or DOC123 as Doctor ID
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

export default DoctorLogin;