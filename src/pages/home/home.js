import React from "react";
import {
  Box,
  Heading,
  Progress,
  Flex,
  Button,
  Input,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import vote from "../../assets/vote.svg";
function Home() {
  return (
    <Box backgroundColor="#f2f3f5">
      <Box
        backgroundColor="#f2f2f2"
        borderRadius={"10"}
        width={"100%"}
        alignItems={"center"}
        textAlign="center"
        alignSelf={"center"}
        border={"1px solid #f2f3f5"}
      >
        <Flex flexDirection={"row"} mt="200" mb="300" justifyContent={"space-between"} >
          <img src={vote} width="100%" height="100%" />
          <Flex flexDirection={"column"} width="100%"  textAlign="center">
            <Heading size={"4xl"}> Epoll </Heading>
            <Heading mt="20"> Best to do an online Poll</Heading>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default Home;
