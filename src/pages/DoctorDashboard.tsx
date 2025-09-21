import { useState } from 'react';
import { Search, Upload, Plus, FileText, User, Calendar, Stethoscope } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { dummyPatients, PatientData, MedicalRecord } from '@/data/dummyData';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState<'lookup' | 'addRecord'>('lookup');
  const [patientId, setPatientId] = useState('');
  const [foundPatient, setFoundPatient] = useState<PatientData | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  
  // Add Record Form State
  const [recordForm, setRecordForm] = useState({
    patientId: '',
    recordType: '',
    comments: '',
    nextCheckup: '',
    uploadedFile: null as File | null
  });
  const [recordSubmitted, setRecordSubmitted] = useState(false);

  const handlePatientSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const patient = dummyPatients[patientId.toUpperCase()];
    setFoundPatient(patient || null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setRecordForm({ ...recordForm, uploadedFile: file });
  };

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate adding record to patient's records
    if (recordForm.patientId && recordForm.recordType) {
      const newRecord: MedicalRecord = {
        id: `REC${Date.now()}`,
        hospitalName: 'Current Hospital',
        date: new Date().toISOString().split('T')[0],
        type: recordForm.recordType,
        doctor: 'Current Doctor',
        fileName: recordForm.uploadedFile?.name || 'uploaded_document.pdf'
      };

      // In a real app, this would update the backend
      const patient = dummyPatients[recordForm.patientId.toUpperCase()];
      if (patient) {
        patient.records.unshift(newRecord);
      }

      setRecordSubmitted(true);
      setTimeout(() => {
        setRecordSubmitted(false);
        setRecordForm({
          patientId: '',
          recordType: '',
          comments: '',
          nextCheckup: '',
          uploadedFile: null
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Doctor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage patient records and healthcare data
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-healthcare">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="font-semibold text-foreground">{Object.keys(dummyPatients).length}</p>
                </div>
              </div>
            </div>
            <div className="card-healthcare">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-healthcare-turquoise/10 rounded-full flex items-center justify-center mr-4">
                  <FileText className="text-healthcare-turquoise" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Records Today</p>
                  <p className="font-semibold text-foreground">0</p>
                </div>
              </div>
            </div>
            <div className="card-healthcare">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-healthcare-navy/10 rounded-full flex items-center justify-center mr-4">
                  <Stethoscope className="text-healthcare-navy" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Appointments</p>
                  <p className="font-semibold text-foreground">5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-xl max-w-md">
            <button
              onClick={() => setActiveTab('lookup')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'lookup'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Patient Lookup
            </button>
            <button
              onClick={() => setActiveTab('addRecord')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'addRecord'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Add Record
            </button>
          </div>

          {/* Patient Lookup Section */}
          {activeTab === 'lookup' && (
            <div className="animate-fade-in">
              <div className="card-healthcare mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Patient Lookup</h2>
                <form onSubmit={handlePatientSearch} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="patientId" className="block text-sm font-medium text-foreground mb-2">
                        Patient ID
                      </label>
                      <input
                        type="text"
                        id="patientId"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="input-healthcare"
                        placeholder="Enter Patient ID (e.g., PAT12345)"
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      <button type="submit" className="btn-healthcare flex items-center gap-2">
                        <Search size={20} />
                        Search
                      </button>
                    </div>
                  </div>
                </form>

                {/* Demo hint */}
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Demo:</strong> Use PAT12345 or PAT67890 as Patient ID
                  </p>
                </div>
              </div>

              {/* Patient Found */}
              {foundPatient && (
                <div className="card-healthcare animate-scale-in">
                  <h3 className="text-xl font-bold text-foreground mb-4">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold text-foreground">{foundPatient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Patient ID</p>
                      <p className="font-semibold text-foreground">{foundPatient.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-semibold text-foreground">{foundPatient.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Group</p>
                      <p className="font-semibold text-foreground">{foundPatient.bloodGroup}</p>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-foreground mb-4">Medical Records</h4>
                  <div className="space-y-3">
                    {foundPatient.records.map((record) => (
                      <div key={record.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-foreground">{record.type}</h5>
                            <p className="text-sm text-muted-foreground">{record.hospitalName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(record.date).toLocaleDateString()} • {record.doctor}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {record.fileName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Patient Not Found */}
              {searchAttempted && !foundPatient && (
                <div className="card-healthcare">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-red-600" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Patient Not Found</h3>
                    <p className="text-muted-foreground">
                      No patient found with ID "{patientId}". Please check the ID and try again.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add Record Section */}
          {activeTab === 'addRecord' && (
            <div className="animate-fade-in">
              <div className="card-healthcare">
                <h2 className="text-2xl font-bold text-foreground mb-6">Add Medical Record</h2>

                {recordSubmitted && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-6 animate-scale-in">
                    ✓ Record added successfully! Patient's records have been updated.
                  </div>
                )}

                <form onSubmit={handleRecordSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="recordPatientId" className="block text-sm font-medium text-foreground mb-2">
                        Patient ID
                      </label>
                      <input
                        type="text"
                        id="recordPatientId"
                        value={recordForm.patientId}
                        onChange={(e) => setRecordForm({ ...recordForm, patientId: e.target.value })}
                        className="input-healthcare"
                        placeholder="Enter Patient ID"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="recordType" className="block text-sm font-medium text-foreground mb-2">
                        Record Type
                      </label>
                      <select
                        id="recordType"
                        value={recordForm.recordType}
                        onChange={(e) => setRecordForm({ ...recordForm, recordType: e.target.value })}
                        className="input-healthcare"
                        required
                      >
                        <option value="">Select record type</option>
                        <option value="General Checkup">General Checkup</option>
                        <option value="Blood Test">Blood Test</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="MRI Scan">MRI Scan</option>
                        <option value="Prescription">Prescription</option>
                        <option value="Surgery Report">Surgery Report</option>
                        <option value="Consultation">Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="fileUpload" className="block text-sm font-medium text-foreground mb-2">
                      Upload Document
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="fileUpload"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                      />
                      <label
                        htmlFor="fileUpload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                          <p className="text-sm text-muted-foreground">
                            {recordForm.uploadedFile 
                              ? recordForm.uploadedFile.name 
                              : 'Click to upload or drag and drop'
                            }
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-foreground mb-2">
                      Comments & Notes
                    </label>
                    <textarea
                      id="comments"
                      value={recordForm.comments}
                      onChange={(e) => setRecordForm({ ...recordForm, comments: e.target.value })}
                      className="input-healthcare min-h-[100px] resize-none"
                      placeholder="Add any relevant comments, treatment notes, or recommendations..."
                    />
                  </div>

                  <div>
                    <label htmlFor="nextCheckup" className="block text-sm font-medium text-foreground mb-2">
                      Next Checkup Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="nextCheckup"
                        value={recordForm.nextCheckup}
                        onChange={(e) => setRecordForm({ ...recordForm, nextCheckup: e.target.value })}
                        className="input-healthcare pr-12"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-healthcare w-full flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    Add Record
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;