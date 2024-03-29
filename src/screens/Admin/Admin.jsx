import React, { useContext, useEffect, useState } from "react";

import {
  Flex,
  Spacer,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Button,
  useDisclosure,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { AddUserModal } from "./components/AddUserModal";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { AddMultipleUserModal } from "./components/AddMultipleUserModal";

const Admin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUserOpen,
    onOpen: onUserOpen,
    onClose: onUserClose,
  } = useDisclosure();
  const { user } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            access_token: user.jwtToken,
            "Content-Type": "application/json",
          },
        };
        const {
          data: { success, error, data },
        } = await axios.get("/api/auth/getUserDetails", config);
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

  const handleDownload = async (id, docname, userId, userName) => {
    try {
      const config = {
        responseType: "arraybuffer",
        headers: {
          access_token: user.jwtToken,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/files/get${id == null ? "?bulk=true" : ""}`,
        {
          documentIds: [id],
          userId: userId,
        },
        config
      );

      var fileDownload = require("js-file-download");
      fileDownload(data, (docname ? docname : userName) + ".zip");
    } catch (error) {
      toast({
        title: "Error",
        description: error?.response?.data?.error
          ? error.response.data.error
          : "Something went wrong.Please try again.",
        status: "error",
      });
    }
  };

  return (
    <>
      <Box p={32} bg="blue.50" height="100vh">
        <Flex spacing={4} mb={12} direction="row" alignItems="center">
          <Box width="3xl">
            <Text fontSize="xl">
              Hello{" "}
              <Text fontWeight="bold" fontSize="3xl">
                {user.name}
              </Text>
            </Text>
          </Box>
          <Spacer></Spacer>
          <Box>
            <Button colorScheme="blue" variant="solid" onClick={onOpen}>
              Add user
            </Button>
            &nbsp;
            <Button colorScheme="blue" onClick={onUserOpen}>
              Add multiple users
            </Button>
          </Box>
        </Flex>

        <AddUserModal isOpen={isOpen} onClose={onClose} />
        <AddMultipleUserModal isOpen={isUserOpen} onClose={onUserClose} />
        {loading ? (
          <Flex justifyContent={"center"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
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
                      <Th>Docs Uploaded</Th>
                      <Th isNumeric>No. of docs Uploaded</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.map((user) => (
                      <Tr>
                        <Td>{user.Username}</Td>
                        <Td> {user.email}</Td>
                        <Td isNumeric>{user.Phone_no}</Td>
                        <Td>
                          {user.document.map((document) => (
                            <Button
                              colorScheme="blue"
                              variant="link"
                              onClick={() =>
                                handleDownload(
                                  document.doc_id,
                                  document.docname,
                                  user.id,
                                  user.Username
                                )
                              }
                              ml={2}
                            >
                              {document.docname}
                            </Button>
                          ))}
                        </Td>
                        <Td isNumeric>{user.no_of_docs}</Td>
                        <Td>
                          {user.no_of_docs ? (
                            <Button
                              colorScheme="blue"
                              variant="link"
                              onClick={() =>
                                handleDownload(
                                  null,
                                  null,
                                  user.id,
                                  user.Username
                                )
                              }
                              ml={2}
                            >
                              Download All
                            </Button>
                          ) : (
                            <></>
                          )}
                        </Td>
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
