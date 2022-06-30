/* eslint-disable react/jsx-no-undef */
import { useContext, useState } from "react";
import { useFormik } from "formik";

//import { AuthProvider } from "./AuthProvider";
import AuthContext from "./AuthProvider";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "../../api/axios";

export default function Login() {
  const { setUserInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const {
        data: { success, error, data },
      } = await axios.post("/api/auth/login", { email, password }, config);
      if (success) {
        setUserInfo(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        //to do snackbar in chakra
        //message will be from backend (error )
      }
      setLoading(false);
    } catch (error) {
      //to do snackbar in chakra
      setLoading(false);
      <ToastExample />;
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });
  return (
    <Flex bg="blue.50" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" boxShadow="lg">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={8} align="flex-start">
            <Text align={"center"} fontWeight="bold" fontSize="3xl">
              Login
            </Text>
            <Text align={"center"} fontSize="md">
              Enter details to begin Onboarding.
            </Text>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email </FormLabel>
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              mt="4px"
              pt="2px"
              isLoading={loading}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
