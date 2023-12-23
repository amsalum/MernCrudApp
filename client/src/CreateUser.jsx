import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChakraProvider, Input, useToast, Stack, Text, InputRightElement, InputLeftAddon, InputGroup, Button, ButtonGroup } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const CreateUser = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const HandleData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/createUser', {
                name,
                email,
                age,
            });

            const data = response.data;
            console.log(data);

            setName('');
            setEmail('');
            setAge('');

            if (data.status === 'ok') {
                toast({
                    title: 'Account created.',
                    position: 'top',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

            }
            navigate('/');
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                position: 'top',
                description: 'An error occurred while creating the account.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    return (
        <ChakraProvider>
            <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
                <div className="w-50 bg-white p-3 rounded-3 border">
                    <Text className="text-center font-weight-bold" >Add new user</Text>
                    <Stack spacing={2}>
                        <label htmlFor="name">Name:</label>
                        <Input variant='outline' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                        <label htmlFor="name">Email:</label>
                        <Input variant='outline' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="name">Age:</label>
                        <Input variant='outline' placeholder='Age' value={age} onChange={e => setAge(e.target.value)} />
                        <label htmlFor="name">Phone Number:</label>
                        <InputGroup>
                            <InputLeftAddon children='+251' />
                            <Input type='tel' placeholder='phone number' />
                        </InputGroup>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? <ViewOffIcon /> : <ViewIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <label htmlFor="name">Date of Birth:</label>
                        <Input
                            placeholder="Select Date"
                            size="md"
                            type="datetime-local"
                        />
                    </Stack>
                    <div className='text-center'>

                        <Button colorScheme='teal' onClick={HandleData} width='50%' className="mt-3 text-center" >Add</Button>
                    </div>
                </div>
            </div>
        </ChakraProvider>
    )
}

export default CreateUser