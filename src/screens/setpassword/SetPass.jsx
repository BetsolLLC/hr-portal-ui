
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

export default function SetPass() {
  return (
    <Flex bgColor="blue.50" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64} boxShadow="lg">
        <Formik
          initialValues={{
            oldpassword: "",
            newpassword: "",
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={8} align="flex-start">
                <Text align={"center"} fontWeight="semibold" fontSize="2xl">
                  Reset Password
                </Text>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Old Password</FormLabel>
                  <Field
                    as={Input}
                    id="oldpassword"
                    name="oldpassword"
                    type="password"
                    variant="filled"
                    validate={(value) => {
                      let error;

                      if (value.length < 5) {
                        error = "Password must contain at least 6 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <Field
                    as={Input}
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    variant="filled"
                    validate={(value) => {
                      let error;

                      if (value.length < 5) {
                        error = "Password must contain at least 6 characters";
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  Set Password
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
