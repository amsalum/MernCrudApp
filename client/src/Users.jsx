import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    ChakraProvider,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Fade,
    useDisclosure,
    Button,
    Box,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then((result) => setUsers(result.data))
            .catch((err) => console.log(err))

    }, [])

    const { IsOpen, onToggle } = useDisclosure();
    const HandleDelete = (id) => {

        axios.delete('http://localhost:5000/delete/' + id)
            .then((result) => {
                setUsers(users.filter((user) => user._id !== id))
            })
            .catch((err) => console.log(err))
        navigate('/')
    }
    return (
        <ChakraProvider>
            <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
                <div className="w-50 bg-white p-3 rounded-3 border">

                    <Link to="/create" className='btn btn-primary'>Add User</Link>
                    <Link to="/update">Update User</Link>
                    <TableContainer>
                        <Table variant={'simple'} size={'sm'} colorScheme="teal">
                            <TableCaption>Imperial to metric conversion factors</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th isNumeric>Age</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users.map((user, index) => {
                                    return <Tr key={index}>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td isNumeric>{user.age}</Td>
                                        <Td>
                                            <Link to={`/update/${user._id}`} className="btn btn-primary me-2">Edit</Link>
                                            <Button colorScheme='red' onClick={onOpen}>
                                                Delete
                                            </Button>

                                            <AlertDialog
                                                isOpen={isOpen}
                                                leastDestructiveRef={cancelRef}
                                                onClose={onClose}
                                            >
                                                <AlertDialogOverlay>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                                            Delete User
                                                        </AlertDialogHeader>

                                                        <AlertDialogBody>
                                                            Are you sure? You can't undo this action afterwards.
                                                        </AlertDialogBody>

                                                        <AlertDialogFooter>
                                                            <Button ref={cancelRef} onClick={onClose}>
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                colorScheme='red'
                                                                onClick={(e) => {
                                                                    HandleDelete(user._id);
                                                                    onClose();
                                                                }}
                                                                ml={3}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialogOverlay>
                                            </AlertDialog>
                                        </Td>
                                    </Tr>
                                })}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>To convert</Th>
                                    <Th>into</Th>
                                    <Th isNumeric>multiply by</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                    <Button onClick={onToggle}>See developer</Button>
                    <Fade in={IsOpen}>
                        <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
                            awoke is here
                        </Box>
                    </Fade>
                </div>
            </div>
        </ChakraProvider>
    );
};

export default Users;