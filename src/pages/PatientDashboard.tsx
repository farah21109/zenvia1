import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Download, Eye, Activity, Heart, Weight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { currentPatient } from '@/data/dummyData';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState<'records' | 'trends'>('records');
  const patient = currentPatient;

  // Prepare chart data
  const bloodPressureData = patient.healthMetrics.map(metric => ({
    date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    systolic: metric.bloodPressure.systolic,
    diastolic: metric.bloodPressure.diastolic
  }));

  const healthTrendsData = patient.healthMetrics.map(metric => ({
    date: new Date(metric.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sugar: metric.sugarLevel,
    weight: metric.weight
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, {patient.name}
            </h1>
            <p className="text-muted-foreground">
              Your health journey at a glance
            </p>
          </div>

          {/* Patient Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-healthcare">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Heart className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patient ID</p>
                  <p className="font-semibold text-foreground">{patient.id}</p>
                </div>
              </div>
            </div>
            <div className="card-healthcare">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-healthcare-turquoise/10 rounded-full flex items-center justify-center mr-4">
                  <Activity className="text-healthcare-turquoise" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-semibold text-foreground">{patient.bloodGroup}</p>
                </div>
              </div>
            </div>
            <div className="card-healthcare">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-healthcare-navy/10 rounded-full flex items-center justify-center mr-4">
                  <Weight className="text-healthcare-navy" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-semibold text-foreground">{patient.age} years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-xl max-w-md">
            <button
              onClick={() => setActiveTab('records')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'records'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Medical Records
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'trends'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Health Trends
            </button>
          </div>

          {/* Medical Records Section */}
          {activeTab === 'records' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">Medical Records</h2>
              <div className="space-y-4">
                {patient.records.map((record) => (
                  <div key={record.id} className="card-healthcare">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="text-primary" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{record.type}</h3>
                          <p className="text-sm text-muted-foreground">{record.hospitalName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })} • Dr. {record.doctor}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                          <Eye size={20} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-healthcare-turquoise transition-colors rounded-lg hover:bg-healthcare-turquoise/10">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Trends Section */}
          {activeTab === 'trends' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground mb-6">Health Trends</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Blood Pressure Chart */}
                <div className="card-healthcare">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Blood Pressure Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={bloodPressureData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="date" 
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis 
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="systolic" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        name="Systolic"
                        dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="diastolic" 
                        stroke="hsl(var(--healthcare-turquoise))" 
                        strokeWidth={3}
                        name="Diastolic"
                        dot={{ fill: 'hsl(var(--healthcare-turquoise))', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Sugar & Weight Chart */}
                <div className="card-healthcare">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Sugar Level & Weight</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={healthTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="date" 
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis 
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="sugar" 
                        fill="hsl(var(--healthcare-navy))"
                        name="Sugar Level (mg/dL)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weight Trend Line Chart */}
              <div className="card-healthcare mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Weight Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={healthTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="date" 
                      className="text-muted-foreground"
                      fontSize={12}
                    />
                    <YAxis 
                      className="text-muted-foreground"
                      fontSize={12}
                      domain={['dataMin - 2', 'dataMax + 2']}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="hsl(var(--healthcare-turquoise))" 
                      strokeWidth={3}
                      name="Weight (kg)"
                      dot={{ fill: 'hsl(var(--healthcare-turquoise))', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PatientDashboard;