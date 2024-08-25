// src/components/LeadsTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeadsTable = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const fetchLeads = async () => {
            const response = await axios.get('http://localhost:5000/api/leads');
            setLeads(response.data);
        };
        fetchLeads();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Channel Partner Code</th>
                    <th>Lead Name</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Lead Source</th>
                    <th>Lead Interest</th>
                    <th>Additional Notes</th>
                    <th>Date Submitted</th>
                </tr>
            </thead>
            <tbody>
                {leads.map(lead => (
                    <tr key={lead._id}>
                        <td>{lead.channelPartnerCode}</td>
                        <td>{lead.leadName}</td>
                        <td>{lead.contactNumber}</td>
                        <td>{lead.email}</td>
                        <td>{lead.leadSource}</td>
                        <td>{lead.leadInterest}</td>
                        <td>{lead.additionalNotes}</td>
                        <td>{new Date(lead.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LeadsTable;