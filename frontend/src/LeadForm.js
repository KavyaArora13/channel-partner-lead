import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeadForm = () => {
    const [leadData, setLeadData] = useState({
        channelPartnerCode: '',
        leadName: '',
        contactNumber: '',
        email: '',
        leadSource: '',
        leadInterest: '',
        additionalNotes: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setLeadData({
            ...leadData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/leads', leadData);
            if (response.status === 200) {
                setMessage('Lead submitted successfully!');
                setError('');
                setLeadData({
                    channelPartnerCode: '',
                    leadName: '',
                    contactNumber: '',
                    email: '',
                    leadSource: '',
                    leadInterest: '',
                    additionalNotes: '',
                });
            }
        } catch (error) {
            setMessage('');
            setError('Error submitting lead');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="w-100">
                <Col md={6} lg={5} className="mx-auto">
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h2 className="text-center mb-4">Submit a Lead</h2>
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formChannelPartnerCode" className="mb-3">
                                    <Form.Label>Channel Partner Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="channelPartnerCode"
                                        value={leadData.channelPartnerCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formLeadName" className="mb-3">
                                    <Form.Label>Lead Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="leadName"
                                        value={leadData.leadName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formContactNumber" className="mb-3">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contactNumber"
                                        value={leadData.contactNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={leadData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formLeadSource" className="mb-3">
                                    <Form.Label>Lead Source</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="leadSource"
                                        value={leadData.leadSource}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Choose...</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Referral">Referral</option>
                                        <option value="Website">Website</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formLeadInterest" className="mb-3">
                                    <Form.Label>Lead Interest</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="leadInterest"
                                        value={leadData.leadInterest}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAdditionalNotes" className="mb-3">
                                    <Form.Label>Additional Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="additionalNotes"
                                        value={leadData.additionalNotes}
                                        onChange={handleChange}
                                        rows={3}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Submit Lead
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LeadForm;