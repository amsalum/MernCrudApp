import React, { useEffect, useState } from 'react'
import { ChakraProvider, Input, Stack, Text, InputRightElement, InputLeftAddon, InputGroup, Button, ButtonGroup } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/getUser/' + id)
            // .then((response) => console.log(response))
            .then((result) => {
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
            })

            .catch((err) => console.log(err))
    }, [])
    const handleUpdate = () => {

        axios.put('http://localhost:5000/update/' + id, { name, email, age })
            .then((result) => navigate('/'))
            .catch((err) => console.log(err))
    }
    return (
        <ChakraProvider>
            <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
                <div className="w-50 bg-white p-3 rounded-3 border">
                    <Text>Edit User</Text>
                    <Stack spacing={3}>
                        <label htmlFor="name" >Name:</label>
                        <Input variant={'outline'} value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Email:</label>
                        <Input variant={'outline'} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="name">Age:</label>
                        <Input variant={'outline'} value={age} onChange={(e) => setAge(e.target.value)} />
                    </Stack>
                    <div className='text-center'>

                        <ButtonGroup className="text-center">
                            <Button colorScheme='teal' size='lg' onClick={handleUpdate} className="mt-3 text-center" >Edit</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </ChakraProvider>
    )
}

export default UpdateUser
