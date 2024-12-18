import React, { useEffect, useState } from 'react';
import { getLoggedInUser, clearLoggedInUser } from '../utils/localStorageUtils';
import { useNavigate} from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap';

function AccountPage() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    clearLoggedInUser();
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-50 shadow">
        <CardHeader>
          <h4 className="text-center">Account Information</h4>
        </CardHeader>
        <CardBody>
          {user && (
            <>
              <Row className="mb-3">
                <Col sm="4">
                  <strong>Username:</strong>
                </Col>
                <Col sm="8">{user.username}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm="4">
                  <strong>Email:</strong>
                </Col>
                <Col sm="8">{user.email}</Col>
              </Row>
            </>

          )}
          <div className="text-center">
            <Button color="primary" className="me-2" onClick={() => navigate('/edit-account')}>
              Edit Account
            </Button>
            <Button color="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AccountPage;
