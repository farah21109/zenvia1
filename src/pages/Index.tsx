import { Link } from 'react-router-dom';
import { Shield, Database, FileText, Users, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import healthcareHero from '@/assets/healthcare-hero.jpg';

const Index = () => {
  const features = [
    {
      icon: Database,
      title: 'Unified Medical History',
      description: 'View all your medical records in one secure, centralized location. Access your complete health journey anytime, anywhere.'
    },
    {
      icon: Users,
      title: 'Interoperability',
      description: 'Doctors and hospitals can securely access your records with your permission, enabling seamless healthcare delivery.'
    },
    {
      icon: FileText,
      title: 'Summarized Records',
      description: 'Get easy-to-read summaries of your medical history, making it simple to understand your health information.'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Your data is protected with bank-level encryption and strict privacy controls. Your health information stays secure.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-background to-secondary">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h1 className="heading-hero mb-6">
                Seamless, Secure, and Smart Healthcare for Everyone
              </h1>
              <p className="text-healthcare text-xl mb-8">
                View and manage your medical history, securely and effortlessly. 
                Connect with healthcare providers through our unified platform.
              </p>
              
              {/* Login Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/patient-login"
                  className="btn-healthcare flex items-center justify-center group"
                >
                  Patient Login
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/doctor-login"
                  className="btn-healthcare-outline flex items-center justify-center group"
                >
                  Doctor Login
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Shield size={16} className="mr-2 text-primary" />
                  Bank-level Security
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-2 text-primary" />
                  Trusted by 10,000+ Patients
                </div>
              </div>
            </div>

            <div className="animate-scale-in">
              <img
                src={healthcareHero}
                alt="Modern healthcare professionals using digital technology"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-section">Why Choose Zenvia?</h2>
            <p className="text-healthcare max-w-3xl mx-auto">
              Our platform revolutionizes healthcare management with cutting-edge technology, 
              ensuring your medical information is always accessible, secure, and actionable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card-feature group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-healthcare-turquoise rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-primary-foreground" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-healthcare-turquoise">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of patients and healthcare providers who trust Zenvia 
              for secure, seamless medical record management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/patient-register"
                className="bg-card text-primary px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Get Started as Patient
              </Link>
              <Link
                to="/doctor-register"
                className="border-2 border-card text-card px-8 py-4 rounded-xl font-semibold hover:bg-card hover:text-primary transition-all duration-300"
              >
                Join as Healthcare Provider
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;