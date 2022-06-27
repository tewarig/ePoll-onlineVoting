import { Heading, Box, Input, Button, Badge, Flex } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import PasswordInput from "../passWordInput/passWordInput";
import {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../../../module/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function HandleAuth() {
  const [showLogin, setLogin] = useState(true);
  const [user, error, loading] = useAuthState(auth);

  const email = useRef();
  const password = useRef();
  const anotherPassword = useRef();
  const name = useRef();
  const login = () => {
    logInWithEmailAndPassword(email.current.value, password.current.value);
  };
  const signUp = () => {
    const password1 = password.current.value;
    const password2 = password.current.value;
    if (password1 === password2) {
      registerWithEmailAndPassword(
        name.current.value,
        email.current.value,
        password1
      );
    }
  };
  const reset = () => {
    if (email.current.value && email.current.value.length > 0) {
      sendPasswordReset(email.current.value);
    }
  };
  if (showLogin)
    return (
      <Box justifyContent={"space-between"} alignItems="center">
        <Heading ml={"20"} mt={"100"}>
          {" "}
          Login
        </Heading>

        <Input mt="50" placeholder="email" type="email" ref={email} required />
        <Box></Box>
        <PasswordInput inputRef={password} mt="2" />
        <Flex ml="2" mt="5" textAlign={"center"}>
          Forgot Password ?{" "}
          <Badge
            mt="1"
            onClick={() => {
              reset();
            }}
          >
            {" "}
            Reset
          </Badge>
        </Flex>

        <Button alignSelf={"center"} ml="100" mt="10" onClick={() => login()}>
          {" "}
          Login
        </Button>
        <Flex ml="25" mt="200" textAlign={"center"}>
          Don't have an account ?
          <Badge
            alignContent={"center"}
            mt="1"
            textAlign="center"
            onClick={() => {
              setLogin((prev) => !prev);
            }}
          >
            {" "}
            SignUP
          </Badge>
        </Flex>
      </Box>
    );
  if (!showLogin) {
    return (
      <Box justifyContent={"space-between"} alignItems="center">
        <Heading ml={"20"} mt={"100"}>
          {" "}
          Sign Up
        </Heading>
        <form>
          <Input
            mt="50"
            placeholder="email"
            type="email"
            ref={email}
            required
          />
          <Input mt="2" placeholder="name" type="text" ref={name} required />

          <Box></Box>
          <PasswordInput inputRef={password} mt="2" />
          <PasswordInput inputRef={anotherPassword} mt="2" />
        </form>

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
        <Button alignSelf={"center"} ml="100" mt="25" onClick={() => signUp()}>
          {" "}
          Sign Up
        </Button>
      </Box>
    );
  }
}

export default HandleAuth;
