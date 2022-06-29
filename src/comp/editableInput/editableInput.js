import { Flex, Input, Button, Heading, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { AiFillEdit } from "react-icons/ai";

function EditableInput({ value, setValue }) {
  const [open, setOpen] = useState(true);
  return (
    <React.Fragment>
      <Flex>
        {open ? (
          <Textarea
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            size="sm"
            placeholder="Enter your question here"
            disabled={!open}
          ></Textarea>
        ) : (
          <Heading size={"xl"}> {value}</Heading>
        )}
      </Flex>
      <Button
        onClick={() => {
          if (value != "") {
            setOpen((open) => !open);
          }
        }}
      >
        {open ? <CheckIcon /> : <AiFillEdit />}
      </Button>
    </React.Fragment>
  );
}

export default EditableInput;
