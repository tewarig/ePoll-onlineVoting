import { Heading, Box, Input, Button, Badge, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import PasswordInput from "../passWordInput/passWordInput";

function HandleAuth() {
  const [showLogin, setLogin] = useState(true);
  if (showLogin)
    return (
      <Box justifyContent={"space-between"} alignItems="center">
        <Heading ml={"20"} mt={"100"}>
          {" "}
          Login
        </Heading>

        <Input mt="50" placeholder="email" type="email" required />
        <Box></Box>
        {/* <Input mt="2" placeholder="password" type="password" required /> */}
        <PasswordInput mt="2" />
        <Flex ml="25" mt="5" textAlign={"center"}>
          Don't have an account ?
          <Badge
            alignContent={"center"}
            textAlign="center"
            onClick={() => {
              setLogin((prev) => !prev);
            }}
          >
            {" "}
            SignUP
          </Badge>
        </Flex>
        <Button alignSelf={"center"} ml="100" mt="25">
          {" "}
          Login
        </Button>
      </Box>
    );
  if (!showLogin) {
    return (
      <Box justifyContent={"space-between"} alignItems="center">
        <Heading ml={"20"} mt={"100"}>
          {" "}
          Sign Up
        </Heading>
        <Input mt="50" placeholder="email" type="email" required />
        <Input mt="2" placeholder="name" type="text" required />

        <Box></Box>
        {/* <Input mt="2" placeholder="password" type="password" required /> */}
        <PasswordInput mt="2" />
        <PasswordInput mt="2" />

        <Flex ml="25" mt="5" textAlign={"center"}>
          Already have an account ?
          <Badge
            alignContent={"center"}
            textAlign="center"
            onClick={() => {
              setLogin((prev) => !prev);
            }}
          >
            {" "}
            SignIn
          </Badge>
        </Flex>
        <Button alignSelf={"center"} ml="100" mt="25">
          {" "}
          Login
        </Button>
      </Box>
    );
  }
}

export default HandleAuth;
