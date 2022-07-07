import React, { useEffect, useState } from "react";

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
  useDisclosure,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { AddUserModal } from "./components/AddUserModal";
import axios from "../../api/axios";
import Header from "../../components/header";

const Admin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    //  add api in the url
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            // Authorization: `Bearer ${user.jwtToken}`,
            "Content-Type": "application/json",
          },
        };
        const {
          data: { success, error, data },
        } = await axios.get("/api/auth/login", config); //api goes here
        if (success) {
          setData(data);
        } else {
          setError(error);
        }
        setLoading(false);
      } catch (err) {
        setError(
          err?.response?.data?.error
            ? err.response.data.error
            : "Something went wrong.Please try again."
        );

        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Box p={32} bg="blue.50" height="100vh">
        <Flex spacing={4} mb={12} direction="row" alignItems="center">
          <Box width="3xl">
            <Text color="teal" fontSize="xl">
              Hello{" "}
              <Text fontWeight="bold" fontSize="3xl">
                Admin
              </Text>
            </Text>
          </Box>
          <Spacer></Spacer>
          <Box>
            <Button colorScheme="blue" variant="ghost" onClick={onOpen}>
              Add user
            </Button>
            {/* <Button colorScheme="blue" onClick={onOpen}>
            Add multiple users
          </Button> */}
          </Box>
        </Flex>

        <AddUserModal isOpen={isOpen} onClose={onClose} />
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <Box maxW="6xl" boxShadow="lg" bg="white" borderRadius="xl">
              <TableContainer p={10}>
                <Table variant="simple" colorScheme="gray">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Mail</Th>
                      <Th isNumeric>Phone No.</Th>
                      <Th isNumeric>Docs Uploaded</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((doc) => (
                      <Tr>
                        <Td>{doc.name}</Td>
                        <Td> {doc.mail}</Td>
                        <Td isNumeric>{doc.phNumber}</Td>
                        <Td isNumeric>{doc.no}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Admin;
