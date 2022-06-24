import React from "react";

import {
    Stack,
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
    ButtonGroup
  } from '@chakra-ui/react'

  const Admin = () => {
    return(
        <VStack p={20} bg="blue.50" height="100vh">
            <Stack spacing={4} mb={12} direction='row' align='center'>
            <Button colorScheme='teal'>Add user</Button>
            <Button colorScheme='teal' variant='outline'>Add multiple users</Button>
            </Stack>
           
        <Box boxShadow="lg" bg="white" borderRadius="xl">
           
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
      </VStack>
    )
}

export default Admin;