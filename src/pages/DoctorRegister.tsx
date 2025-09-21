import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    aadhaar: '',
    medicalRegNumber: '',
    specialization: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [generatedDoctorId, setGeneratedDoctorId] = useState('');

  const specializations = [
    'General Physician',
    'Cardiologist',
    'Neurologist',
    'Orthopedic',
    'Pediatrician',
    'Dermatologist',
    'Psychiatrist',
    'ENT Specialist',
    'Gynecologist',
    'Ophthalmologist'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.aadhaar.length !== 12) {
      alert('Please enter a valid 12-digit Aadhaar ID');
      return;
    }

    if (!formData.medicalRegNumber) {
      alert('Medical Registration Number is required');
      return;
    }

    // Generate Doctor ID
    const doctorId = 'DOC' + Math.floor(100000 + Math.random() * 900000);
    setGeneratedDoctorId(doctorId);
    setRegistrationSuccess(true);
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
        <Header />
        
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-md mx-auto">
              <div className="form-healthcare text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-foreground mb-4">Registration Successful!</h1>
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl mb-8">
                  <p className="font-medium mb-2">Doctor registered successfully!</p>
                  <p className="text-sm">Your unique Doctor ID is:</p>
                  <p className="text-2xl font-bold mt-2">{generatedDoctorId}</p>
                </div>
                <Link
                  to="/doctor-login"
                  className="btn-healthcare"
                >
                  Login Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-md mx-auto">
            <div className="form-healthcare">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">New Doctor Registration</h1>
                <p className="text-muted-foreground">Join our healthcare network</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-healthcare"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
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
                    placeholder="12-digit Aadhaar ID"
                    maxLength={12}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="medicalRegNumber" className="block text-sm font-medium text-foreground mb-2">
                    Medical Registration Number *
                  </label>
                  <input
                    type="text"
                    id="medicalRegNumber"
                    name="medicalRegNumber"
                    value={formData.medicalRegNumber}
                    onChange={handleChange}
                    className="input-healthcare"
                    placeholder="Enter your medical registration number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-foreground mb-2">
                    Specialization
                  </label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="input-healthcare"
                    required
                  >
                    <option value="">Select your specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Create Password
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
                  Register
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Already registered?{' '}
                  <Link
                    to="/doctor-login"
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

export default DoctorRegister;