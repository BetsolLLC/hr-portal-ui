import {
  Button,
  FormControl,
  FormLabel,
  Input,
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "../../../api/axios";
import AuthContext from "../../../context/AuthProvider";

export const AddUserModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useContext(AuthContext);

  const handleEmail = async (name, email, batch, number) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          access_token: user.jwtToken,
        },
      };
      const {
        data: { success, error, data },
      } = await axios.post(
        "/api/auth/addusers",
        { name, email, batch, number },
        config
      );
      if (success) {
        toast({
          title: "Success",
          description: "User added succesfully",
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
      toast({
        title: "Error",
        description: error.response.data.error
          ? error.response.data.error
          : "Something went wrong.Please try again.",
        status: "error",
      });
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      batch: "",
      number: "",
    },
    onSubmit: (values) => {
      handleEmail(values.name, values.email, values.batch, values.number);
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={formik.handleSubmit}>
        <ModalContent>
          <ModalHeader>Add new user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={8} align="flex-start">
              <Text align={"center"} fontWeight="bold" fontSize="3xl">
                Enter Details
              </Text>

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Mail</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Batch</FormLabel>
                <Input
                  id="batch"
                  name="batch"
                  type="batch"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.batch}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Number</FormLabel>
                <Input
                  id="number"
                  name="number"
                  type="number"
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.number}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button isLoading={loading} colorScheme="blue" mr={3} type="submit">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
