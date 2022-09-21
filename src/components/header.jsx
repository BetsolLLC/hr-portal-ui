import React, { useContext } from "react";
import {
  Box,
  Image,
  Flex,
  Spacer,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as RLink } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Header = () => {
  const { setUserInfo } = useContext(AuthContext);
  const logout = () => {
    setUserInfo({});
    localStorage.removeItem("userInfo");
  };
  return (
    <Flex bg="white" py={6} px={32} alignItems="center">
      <Box>
        <Image src="https://www.betsol.com/wp-content/uploads/2020/02/betsol_logo_150x82.png"></Image>
      </Box>
      <Spacer></Spacer>
      <Box>
        <HStack>
          <Box>
            <Link
              to="/preonboarding"
              as={RLink}
              color="blue.600"
              marginRight={4}
              fontWeight={500}
            >
              Preonboarding
            </Link>
          </Box>
          <Box>
            <Link to="/onboarding" as={RLink} color="blue.600" fontWeight={500}>
              Onboarding
            </Link>
          </Box>
          <Box>
            <Button colorScheme="blue" variant="ghost" onClick={logout}>
              Logout
            </Button>
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Header;
