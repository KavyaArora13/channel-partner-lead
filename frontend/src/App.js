import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeadForm from './LeadForm';
import LeadsTable from './LeadTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LeadForm.css';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LeadForm />} />
                    <Route path="/leads" element={<LeadsTable />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;