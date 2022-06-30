import React from "react";
import {
  Box,
  Heading,
  Progress,
  Flex,
  Button,
  Input,
  IconButton,
} from "@chakra-ui/react";

export default function Poll() {
  const options = [
    {
      id: 0,
      value: "Yes",
      vote: 5,
    },
    {
      id: 1,
      value: "No",
      vote: 10,
    },
    {
      id: 2,
      value: "I don't know what is javascript ?",
      vote: 15,
    },
  ];
  return (
    <Box alignItems={"center"}>
      <Box
        backgroundColor="#f2f2f2"
        borderRadius={"10"}
        mt="5"
        width={"80%"}
        padding="10"
        alignItems={"center"}
        textAlign="center"
        alignSelf={"center"}
        ml="150"
        boxShadow="xs"
      >
        <Heading>What is the best way to learn javascript ?</Heading>
        <Flex flexDirection={"column"} mt="5">
          {options.map((option) => (
            <Button margin={"2"} padding={"8"} colorScheme="blue">
              <Heading>{option.value}</Heading>
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
