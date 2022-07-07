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
import "./PreOnboarding.css";

import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { CheckCircleIcon } from "@chakra-ui/icons";

const PreOnboarding = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      } = await axios.get("/api/auth/docname", config);
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
  const handleDownload = async (id, docname) => {
    try {
      const config = {
        responseType: "arraybuffer",
        headers: {
          access_token: user.jwtToken,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/files/get`,
        {
          documentIds: [id],
        },
        config
      );

      var fileDownload = require("js-file-download");
      console.log(data);
      fileDownload(data, docname + ".zip");
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
  const handleChange = async (event, id) => {
    setLoading(true);
    const selectedFile = event.target.files[0];
    try {
      event.preventDefault();
      const formData = new FormData();
      // name of file to be uploaded on server 'file'
      formData.append("file", selectedFile);
      const config = {
        headers: {
          access_token: user.jwtToken,
          "Content-Type": "multipart/form-data",
        },
      };

      const {
        data: { success, error },
      } = await axios.post(`/api/auth/upload?id=${id}`, formData, config);
      if (success) {
        toast({
          title: "Success",
          description: "Document uploaded successfully.",
          status: "success",
        });
        fetchData();
      } else {
        toast({
          title: "Error",
          description: error,
          status: "error",
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error?.response?.data?.error
          ? error.response.data.error
          : "Something went wrong.Please try again.",
        status: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex bg="blue.50" align="center" justify="center" h="100vh" w="100%">
      <VStack spacing={8} align="center" w="100%">
        <form>
          <Box bg="white" m={6} p={6} rounded="md" w="100%" boxShadow="lg">
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
              {data?.map((doc) => (
                <Box
                  bg="white"
                  m={6}
                  p={6}
                  rounded="md"
                  w="100%"
                  boxShadow="lg"
                >
                  <FormControl>
                    <FormLabel htmlFor="email">
                      {" "}
                      <Text fontWeight={600} fontSize="lg">
                        {doc.docname}{" "}
                      </Text>
                    </FormLabel>
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => handleChange(e, doc.id)}
                      id={doc.id}
                      accept=".pdf"
                      style={{
                        display: "none",
                      }}
                    />
                    <label className="inputStyle" htmlFor={doc.id}>
                      Select file
                    </label>
                  </FormControl>
                  {doc.uploaded && (
                    <Box mt={2}>
                      <CheckCircleIcon w={4} h={4} color="green.500" />
                      <Button
                        colorScheme="blue"
                        variant="link"
                        onClick={() => handleDownload(doc.id, doc.docname)}
                        ml={2}
                      >
                        Download
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
            </>
          )}
        </form>
      </VStack>
    </Flex>
  );
};

export default PreOnboarding;
