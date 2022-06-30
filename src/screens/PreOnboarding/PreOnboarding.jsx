import React, { useContext } from "react";
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
} from "@chakra-ui/react";
import AuthContext from "../Login/AuthProvider";

const PreOnboarding = () => {
  const { user } = useContext(AuthContext);
  return (
    <Flex bg="blue.50" align="center" justify="center" h="100vh" w="100%">
      <VStack spacing={8} align="center" w="80%">
        <Box bg="white" p={6} rounded="md" w="80%" boxShadow="lg">
          <Text fontSize="3xl" fontWeight="bold">
            Pre-Onboarding Details
          </Text>
          <Text align={"justify"} fontSize="l">
            Enter details all the details.
          </Text>
        </Box>
        <Box bg="white" p={6} rounded="md" w="80%" boxShadow="lg">
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
        </Box>
      </VStack>
    </Flex>
  );
};

export default PreOnboarding;
