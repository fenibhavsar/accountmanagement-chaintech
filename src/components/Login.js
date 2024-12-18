import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getUsersFromLocalStorage, saveLoggedInUser } from '../utils/localStorageUtils';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardHeader,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import { Mail, Lock, Eye, EyeOff } from 'react-feather';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [errorValidation, setErrorValidation] = useState('');
  const navigate = useNavigate();


  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least 1 lowercase, 1 uppercase, 8+ characters
    return regex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsersFromLocalStorage();

    if (!validatePassword(password)) {
      setErrorValidation('Password must be at least 8 characters long, with at least one uppercase and one lowercase letter.');
      return;
    }
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      saveLoggedInUser(user);
      navigate('/account');
    } else {
      setError('Invalid email or password');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-50 shadow">
        <CardHeader>
          <h4 className="text-center">Login</h4>
        </CardHeader>
        <CardBody>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleLogin}>
            <Row className="mb-3">
              <Label sm="3">Email</Label>
              <Col sm="9">
                <InputGroup>
                  <InputGroupText>
                    <Mail size={16} />
                  </InputGroupText>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className="mb-3">
              <Label sm="3">Password</Label>
              <Col sm="9">
                <InputGroup>
                  <InputGroupText>
                    <Lock size={16} />
                  </InputGroupText>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
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
            <Row>
              <Col className="text-center">
                <Button color="primary" type="submit">
                  Login
                </Button>
              </Col>
            </Row>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginPage;
