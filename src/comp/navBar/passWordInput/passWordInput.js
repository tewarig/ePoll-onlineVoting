import { Button, Input, Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function PasswordInput(props) {
  const [showPassWord, setShowPassWord] = useState(false);
  return (
    <Flex {...props}>
      <Input type={showPassWord ? "text" : "password"} placeholder="password" />
      <Button
        onClick={() => {
          setShowPassWord((prevPass) => !prevPass);
        }}
      >
        {showPassWord ? <ViewOffIcon /> : <ViewIcon />}{" "}
      </Button>
    </Flex>
  );
}

export default PasswordInput;
