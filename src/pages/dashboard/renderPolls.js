import { Flex, Heading, Box, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { UserState } from "../../context";
import { EditIcon } from "@chakra-ui/icons";

function RenderPolls() {
  const polls = UserState();
  const getTotalVote = (options) => {
    let votes = 0;
    for (let i = 0; i < options.length; i++) {
      votes += options[i].votes;
    }
    return votes;
  };

  return (
    <Flex flexDirection={"column"} padding="20">
      {polls.map((x) => {
        return (
          <Flex
            backgroundColor={"#d9d9d9"}
            margin="1"
            alignItems={"center"}
            textAlign="center"
            borderRadius={"25"}
            padding="10"
            flexDirection={"row"}
            justifyContent="space-between"
          >
            <Heading> {x.data().title}</Heading>
            <Flex>
              <Button>{getTotalVote(x.data().options)} votes</Button>
              <Button>
                <IconButton icon={<EditIcon />} ml="2" isRound={true} />
                View Details
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default RenderPolls;
