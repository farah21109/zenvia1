// Dummy data for healthcare dashboard
export interface MedicalRecord {
  id: string;
  hospitalName: string;
  date: string;
  type: string;
  doctor: string;
  fileName: string;
}

export interface HealthMetric {
  date: string;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  sugarLevel: number;
  weight: number;
}

export interface PatientData {
  id: string;
  name: string;
  age: number;
  bloodGroup: string;
  records: MedicalRecord[];
  healthMetrics: HealthMetric[];
}

export const dummyPatients: { [key: string]: PatientData } = {
  'PAT12345': {
    id: 'PAT12345',
    name: 'John Doe',
    age: 35,
    bloodGroup: 'A+',
    records: [
      {
        id: 'REC001',
        hospitalName: 'City General Hospital',
        date: '2024-01-15',
        type: 'General Checkup',
        doctor: 'Dr. Smith',
        fileName: 'checkup_jan_2024.pdf'
      },
      {
        id: 'REC002',
        hospitalName: 'Metro Care Center',
        date: '2024-02-20',
        type: 'Blood Test',
        doctor: 'Dr. Johnson',
        fileName: 'blood_test_feb_2024.pdf'
      },
      {
        id: 'REC003',
        hospitalName: 'Wellness Clinic',
        date: '2024-03-10',
        type: 'Cardiology Consultation',
        doctor: 'Dr. Williams',
        fileName: 'cardio_march_2024.pdf'
      }
    ],
    healthMetrics: [
      { date: '2024-01-01', bloodPressure: { systolic: 120, diastolic: 80 }, sugarLevel: 95, weight: 75 },
      { date: '2024-01-15', bloodPressure: { systolic: 125, diastolic: 82 }, sugarLevel: 98, weight: 74.5 },
      { date: '2024-02-01', bloodPressure: { systolic: 118, diastolic: 78 }, sugarLevel: 92, weight: 74 },
      { date: '2024-02-15', bloodPressure: { systolic: 122, diastolic: 81 }, sugarLevel: 96, weight: 73.8 },
      { date: '2024-03-01', bloodPressure: { systolic: 119, diastolic: 79 }, sugarLevel: 94, weight: 73.5 },
      { date: '2024-03-15', bloodPressure: { systolic: 121, diastolic: 80 }, sugarLevel: 97, weight: 73.2 }
    ]
  },
  'PAT67890': {
    id: 'PAT67890',
    name: 'Jane Smith',
    age: 28,
    bloodGroup: 'B+',
    records: [
      {
        id: 'REC004',
        hospitalName: 'Women\'s Health Center',
        date: '2024-01-10',
        type: 'Gynecological Checkup',
        doctor: 'Dr. Davis',
        fileName: 'gyno_checkup_jan_2024.pdf'
      },
      {
        id: 'REC005',
        hospitalName: 'City General Hospital',
        date: '2024-02-25',
        type: 'Vaccination',
        doctor: 'Dr. Brown',
        fileName: 'vaccination_feb_2024.pdf'
      }
    ],
    healthMetrics: [
      { date: '2024-01-01', bloodPressure: { systolic: 115, diastolic: 75 }, sugarLevel: 88, weight: 62 },
      { date: '2024-01-15', bloodPressure: { systolic: 118, diastolic: 77 }, sugarLevel: 90, weight: 61.8 },
      { date: '2024-02-01', bloodPressure: { systolic: 116, diastolic: 76 }, sugarLevel: 87, weight: 61.5 },
      { date: '2024-02-15', bloodPressure: { systolic: 117, diastolic: 78 }, sugarLevel: 89, weight: 61.3 },
      { date: '2024-03-01', bloodPressure: { systolic: 114, diastolic: 74 }, sugarLevel: 86, weight: 61 },
      { date: '2024-03-15', bloodPressure: { systolic: 116, diastolic: 76 }, sugarLevel: 88, weight: 60.8 }
    ]
  }
};

export const currentPatient: PatientData = dummyPatients['PAT12345'];