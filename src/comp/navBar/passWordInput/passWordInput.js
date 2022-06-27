import { Button, Input, Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function PasswordInput(props) {
  const [showPassWord, setShowPassWord] = useState(false);
  const { inputRef, ...otherProps } = props;
  return (
    <Flex {...otherProps}>
      <Input
        type={showPassWord ? "text" : "password"}
        ref={inputRef}
        placeholder="password"
      />
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
