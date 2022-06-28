import React from 'react';
import { Box,Image,Flex,Spacer,HStack,Button } from '@chakra-ui/react'

const Header = ()=>{
    return(
        <Flex bg="white" py={6} px={32}  alignItems='center'>
            <Box><Image src='https://www.betsol.com/wp-content/uploads/2020/02/betsol_logo_150x82.png'></Image></Box>
            <Spacer></Spacer>
            <Box><HStack><Box>  <Button colorScheme='teal' variant='ghost' >Item1</Button></Box> <Box>  <Button colorScheme='teal' variant='ghost' >Item2</Button></Box>
            <Box>  <Button colorScheme='teal' variant='ghost' >Item3</Button></Box> </HStack></Box>
        </Flex>
    )
}

export default Header;