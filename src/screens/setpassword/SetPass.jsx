import { useFormik } from "formik";
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
import { useState } from "react";
import axios from "../../api/axios";
import { Link, useSearchParams } from "react-router-dom";

export default function SetPass() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const oldpassword = searchParams.get("oldpassword");
  const email = searchParams.get("email");

  const toast = useToast();
  const setPassword = async (newpassword, confirmpassword) => {
    setLoading(true);

    let error;

    if (newpassword.length < 8) {
      error = "Password must contain at least 8 characters.";
    } else if (newpassword.length > 20) {
      error = "Password must contain a maximum of 20 characters";
    } else if (
      newpassword.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      ) == null
    ) {
      error =
        "Password must contain atleast 1 uppercase, 1 lowercase, 1 digit and 1 special character and no spaces.";
    } else if (newpassword !== confirmpassword) {
      error = "Passwords do not match.";
    }
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          access_token: token,
        },
      };
      const {
        data: { success, error },
      } = await axios.post(
        "/api/auth/forgotpassword",
        { email, oldpassword, newpassword },
        config
      );
      if (success) {
        toast({
          title: "Success",
          description: "Password Reset Successfully!",
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
        description: error?.response?.data?.error
          ? error.response.data.error
          : "Something went wrong.Please try again.",
        status: "error",
      });
      setLoading(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      newpassword: "",
      confirmpassword: "",
    },
    onSubmit: (values) => {
      setPassword(values.newpassword, values.confirmpassword);
    },
  });

  return (
    <Flex bgColor="blue.50" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64} boxShadow="lg">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={8} align="flex-start">
            <Text align={"center"} fontWeight="semibold" fontSize="2xl">
              Set Password
            </Text>
            <FormControl>
              <FormLabel htmlFor="password">New Password</FormLabel>
              <Input
                id="newpassword"
                name="newpassword"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.newpassword}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Confirm Password</FormLabel>
              <Input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={loading}
            >
              Reset Password
            </Button>

            <Link to="/login">
              <Button colorScheme="blue" variant="link">
                Back to Login
              </Button>
            </Link>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
