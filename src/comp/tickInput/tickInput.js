import React, { useRef } from "react";
import { Flex, IconButton, Input } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

function TickInput({ value, onClickFunction, ...otherProps }) {
  const inputRef = useRef();
  function addValue() {
    console.log(inputRef.current.value);
    onClickFunction(inputRef.current.value, value.length);
  }
  return (
    <React.Fragment>
      <Flex alignContent={"center"} mt="10" {...otherProps}>
        <Input width={"80%"} ref={inputRef} />{" "}
        <IconButton
          ml="5"
          icon={<CheckIcon />}
          isRound={true}
          onClick={addValue}
        />
      </Flex>
    </React.Fragment>
  );
}

export default TickInput;
