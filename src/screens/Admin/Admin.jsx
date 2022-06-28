import React from "react";


import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
    Stack,
    Spacer,
    VStack,
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text,
    Button,
    ButtonGroup,
    useDisclosure
  } from '@chakra-ui/react'

  const Admin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <Box p={32}  bg="blue.50" height="100vh">
            <Flex spacing={4} mb={12} direction='row' alignItems='center'>
              <Box width='3xl'><Text color="teal" fontSize='xl'>Hello <Text fontWeight='bold' fontSize='3xl'>Admin</Text></Text></Box>
              <Spacer></Spacer>
            <Box>
            <Button colorScheme='teal' variant='ghost' onClick={onOpen}>Add user</Button>
            <Button colorScheme='teal' onClick={onOpen} >Add multiple users</Button>
            </Box>
            
            
            </Flex>
           
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
  <FormLabel htmlFor='email'>Email address</FormLabel>
  <Input id='email' type='email' />
 
</FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Submit
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    
        <Box maxW='6xl' boxShadow="lg" bg="white" borderRadius="xl">
           
        <TableContainer p={10}>
        <Table variant='simple' colorScheme='gray'>
          
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Mail</Th>
              <Th isNumeric>Phone No.</Th>
              <Th isNumeric>Docs Uploaded</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Nagamma</Td>
              <Td> nagu@gmail.com</Td>
              <Td isNumeric>9999999999</Td>
              <Td isNumeric>5</Td>
            </Tr>
            <Tr>
              <Td>Dinesh</Td>
              <Td> dinesh@gmail.com</Td>
              <Td isNumeric>9999999999</Td>
              <Td isNumeric>2</Td>
            </Tr>
            <Tr>
              <Td>Lakshmamma</Td>
              <Td> luckyamma@gmail.com</Td>
              <Td isNumeric>9999999999</Td>
              <Td isNumeric>7</Td>
            </Tr>
            <Tr>
              <Td>Ansan</Td>
              <Td> pigeonnest@gmail.com</Td>
              <Td isNumeric>8888888888</Td>
              <Td isNumeric>3</Td>
            </Tr>
          </Tbody>
         
        </Table>
      </TableContainer>
      </Box>
      </Box>
    )
}

export default Admin;