import React from 'react';
import { Box,Image,Flex,Spacer,HStack,Button,Center, VStack,Text } from '@chakra-ui/react'

const Footer = ()=>{
    return(
        // <Flex bg="white" py={6} px={32}  alignItems='center' justifyItems='center'>
            <Center py={6}><Flex alignItems='center' gap='12'><Image src='https://www.betsol.com/wp-content/uploads/2020/02/betsol_logo_150x82.png'></Image><Text color=''>©All rights Reserved</Text></Flex></Center>
         
        // </Flex>
    )
}

export default Footer;