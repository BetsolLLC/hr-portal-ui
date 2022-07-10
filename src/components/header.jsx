import React, { useContext } from "react";
import { Box, Image, Flex, Spacer, HStack, Button } from "@chakra-ui/react";
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
            <Button colorScheme="blue" variant="ghost" onClick={logout}>
              Logout
            </Button>
          </Box>
          <Box>
            {/* <Button colorScheme="teal" variant="ghost">
              Item2
            </Button> */}
          </Box>
          <Box>
            {/* <Button colorScheme="teal" variant="ghost">
              Item3
            </Button> */}
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Header;
