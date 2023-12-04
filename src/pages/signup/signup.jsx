import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../signup/signup.css'
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import { signupValid } from '../../valid.js/signupValid';
import axios from 'axios'

function Signup() {

const [Fullname, setFullName] = useState('')
const [Username, setUsername] = useState('')
const [EmailOrMobile, setEmailOrMobile] = useState('')
const [Password, setPassword] = useState('')
const [error, setError] = useState('')


// const handleClick = async (e) =>{
//   e.preventDefault()
//   await axios.post('http://localhost:5000/user/signup', {Fullname, Username, EmailOrMobile, Password});  
//   setFullName('')
//   setUsername('')
//   setEmailOrMobile('')
//   setPassword('')
// }
const handleClick = async (e) =>{
  try{
  e.preventDefault()
  const userData = {Fullname, Username, EmailOrMobile, Password}
  const isValidate = await signupValid(userData)
  if (isValidate) {
    await axios.post('http://localhost:5000/user/signup', userData);
    setFullName('')
    setUsername('')
    setEmailOrMobile('')
    setPassword('')
  } else {
    console.log('meeeeeeeeeeeeeeeeeeeeh');
  }
  } catch(error){
    console.log('error during handleClick: ',error);
  }
}




  return (
    <div className='form'>
      <Container className='containerSignup'>
        <p>Sign up to see photos and videos from your friends.</p>
        <Form >

          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name='Fullname' value={Fullname} onChange={(e) =>{setFullName(e.target.value)}} placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name='Username' value={Username} onChange={(e) =>{setUsername(e.target.value)}} placeholder="Enter a username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmailOrMobile">
            <Form.Label>Email or Mobile Number</Form.Label>
            <Form.Control type="text" name='EmailOrMobile' value={EmailOrMobile} onChange={(e) =>{setEmailOrMobile(e.target.value)}} placeholder="Enter your email or mobile number" />
            <Form.Text className="text-muted">
              We'll never share your email or mobile number with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={Password} onChange={(e) =>setPassword(e.target.value)} name='Password' placeholder="Password" />

          </Form.Group>
          {error ?(
              <p className='error'>{`! ${error}`}</p>
          ) : null}

          <Button variant="primary" type='submit' onClick={handleClick} >
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Signup;