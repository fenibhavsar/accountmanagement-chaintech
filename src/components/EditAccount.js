import React, { useEffect, useState } from 'react';
import {
    getLoggedInUser,
    getUsersFromLocalStorage,
    saveLoggedInUser,
    saveUsersToLocalStorage,
} from '../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Form, Row, Col, Input, Label, Button, InputGroup, InputGroupText } from 'reactstrap';
import { Eye, EyeOff } from 'react-feather';

function EditAccountPage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorValidation, setErrorValidation] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least 1 lowercase, 1 uppercase, 8+ characters
        return regex.test(password);
    };

    useEffect(() => {
        const loggedInUser = getLoggedInUser();
        if (loggedInUser) {
            setUsername(loggedInUser.username);
            setEmail(loggedInUser.email);
            setPassword(loggedInUser.password);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        const users = getUsersFromLocalStorage();
        if (!validatePassword(password)) {
            setErrorValidation('Password must be at least 8 characters long, with at least one uppercase and one lowercase letter.');
            return;
        }
        const updatedUser = { username, email, password };

        const updatedUsers = users.map((user) =>
            user.email === getLoggedInUser().email ? updatedUser : user
        );

        saveUsersToLocalStorage(updatedUsers);
        saveLoggedInUser(updatedUser);
        navigate('/account');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card className="w-50 shadow">
                <CardHeader>
                    <h4 className="text-center">Edit Account</h4>
                </CardHeader>
                <CardBody>

                    <Form onSubmit={handleSaveChanges}>
                        <Row className="mb-3">
                            <Label sm="3">Username</Label>
                            <Col sm="9">
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label sm="3">Email</Label>
                            <Col sm="9">
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Label sm="3">Password</Label>
                            <Col sm="9">
                                <InputGroup>

                                    <Input
                                        type={showPassword ? 'text' : 'password'}

                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <InputGroupText
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </InputGroupText>
                                </InputGroup>
                                {errorValidation && <p style={{ color: 'red', fontSize: '12px' }}>{errorValidation}</p>}
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button color="primary" className="me-2" type="submit">
                                Save Changes
                            </Button>
                            <Button color="danger" onClick={() => navigate('/account')}>
                                Close
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default EditAccountPage;
