import {
  Box,
  Heading,
  Progress,
  Flex,
  Button,
  Input,
  IconButton,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { AttachmentIcon } from "@chakra-ui/icons";

const View = () => {
  const options = [
    {
      id: 0,
      value: "success",
      vote: 5,
    },
    {
      id: 1,
      value: "Meow",
      vote: 10,
    },
    {
      id: 2,
      value: "macbook",
      vote: 15,
    },
  ];
  const totalView = useMemo(() => {
    let total = 0;
    options.forEach((option) => {
      total += option.vote;
    });
    return total;
  }, [options]);
  const calculatePercentage = (vote) => {
    return (vote / totalView) * 100;
  };
  const copyToClipBoard = () => {
    console.log("copied");
    navigator.clipboard.writeText(
      `${window.location.origin}/poll/${options[0].value}`
    );
  };
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
        <Box alignItems={"center"} textAlign="center">
          <Box ml="40%">
            <Flex ml="20" mr="20" alignItems={"center"} textAlign="center">
              {/* <Heading> Poll </Heading> */}
            </Flex>
          </Box>

          <Heading> How do this mini project looks in the end ?</Heading>

          <Flex
            width={"100%"}
            flexDirection="column"
            alignContent={"center"}
            textAlign="center"
            alignItems={"center"}
            mb="20"
          >
            <Flex width={"80%"} alignSelf="center" ml="50%" mt="5">
              <Box
                alignContent={"center"}
                justifyContent="center"
                textAlign={"center"}
              >
                <Heading size={"sm"} mt="3%">
                  https://epoll.gauravtewari.xyz/poll/sfdlndslckndsclkdn
                </Heading>
              </Box>
              <IconButton
                icon={<AttachmentIcon onClick={() => copyToClipBoard()} />}
              />
            </Flex>
            <Flex mt="10">
              <Heading> {totalView} Votes</Heading>
            </Flex>
            {options.map((option) => (
              <Flex
                id={option.id}
                flexDirection={"column"}
                width="80%"
                alignContent={"center"}
                textAlign="center"
              >
                <Flex justifyContent={"space-between"} margin="5">
                  <Heading>{option.value}</Heading>
                  <Button>
                    {parseInt(calculatePercentage(option.vote))} %
                  </Button>
                </Flex>
                <Progress
                  value={calculatePercentage(option.vote)}
                  colorScheme="green"
                  backgroundColor={"white"}
                />
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default View;
