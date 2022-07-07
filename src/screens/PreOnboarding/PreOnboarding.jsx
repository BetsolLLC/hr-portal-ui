import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
  Text,
  Spinner,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

const PreOnboarding = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [file, setFile] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(error);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // name of file to be uploaded on server 'file'
    formData.append("file", file);
    axios
      .post("./api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    //  add api in the url
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
            "Content-Type": "application/json",
          },
        };
        const {
          data: { success, error, data },
        } = await axios.get("/api/auth/login", config);
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
    <Flex bg="blue.50" align="center" justify="center" padding="32" w="100%">
      <VStack spacing={8} align="center" w="80%">
        <form onSubmit={handleSubmit}>
          <Box bg="white" m={6} p={6} rounded="md" w="80%" boxShadow="lg">
            <Text fontSize="3xl" fontWeight="bold">
              Pre-Onboarding Details
            </Text>
            <Text align={"justify"} fontSize="l">
              Enter details all the details.
            </Text>
          </Box>
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
              <Box bg="white" m={6} p={6} rounded="md" w="80%" boxShadow="lg">
                <FormControl>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input id="email" type="email" />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
              </Box>

              <Box bg="white" m={6} p={6} rounded="md" w="80%" boxShadow="lg">
                <FormControl>
                  <FormLabel htmlFor="email">Aadhar Card</FormLabel>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => handleChange(e)}
                    id="upload-button"
                    accept=".pdf"
                  />
                </FormControl>
              </Box>
              <Box m={6} p={6} w="80%">
                <Button type="submit" colorScheme="blue">
                  Submit
                </Button>
              </Box>
            </>
          )}
        </form>
      </VStack>
    </Flex>
  );
};

export default PreOnboarding;
