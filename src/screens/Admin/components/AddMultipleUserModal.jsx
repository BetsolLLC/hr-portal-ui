import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
  Text,
  Link,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import axios from "../../../api/axios";
import AuthContext from "../../../context/AuthProvider";
import samplecsv from "../../../files/sample.csv";
export const AddMultipleUserModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(`changed file ${file}, \n ${selectedFile}`);
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    console.log(`file: ${file}`);
    try {
      event.preventDefault();
      const formData = new FormData();
      // name of file to be uploaded on server 'file'
      formData.append("file", file);
      const config = {
        headers: {
          access_token: user.jwtToken,
          "Content-Type": "multipart/form-data",
        },
      };
      const {
        data: { success, error },
      } = await axios.post(`/api/auth/bulk-user-addition`, formData, config);
      if (success) {
        toast({
          title: "Success",
          description: "User Addition Request Initiated",
          status: "success",
        });
      } else {
        toast({
          title: "Error",
          description: error,
          status: "error",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(`error sending csv ${error}`);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Add Multiple Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={8} align="flex-start">
              <Text align={"center"} fontWeight="bold" fontSize="1xl">
                Upload the CSV File
              </Text>

              <FormControl>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => handleChange(e)}
                  accept=".csv"
                />
              </FormControl>
              <Link
                href={samplecsv}
                download="Sample CSV"
                target="_blank"
                color="blue"
              >
                Sample CSV file
              </Link>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={(e) => {
                handleSubmit(e);
                console.log("clicked");
              }}
              disabled={!file}
              isLoading={loading}
              colorScheme="blue"
              mr={3}
              type="submit"
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
