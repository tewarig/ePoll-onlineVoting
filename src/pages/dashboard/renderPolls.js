import { Flex, Heading, Box, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { UserState } from "../../context";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function RenderPolls() {
  const polls = UserState();
  const getTotalVote = (options) => {
    let votes = 0;
    for (let i = 0; i < options.length; i++) {
      votes += options[i].votes;
    }
    return votes;
  };

  if (polls.length == 0) {
    return (
      <Flex
        flexDirection={"column"}
        padding="20"
        alignContent={"center"}
        alignItems={"center"}
        margin="20"
      >
        <Heading>No Polls Found please create a new One </Heading>
        <img src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/344/external-page-not-found-shopping-and-retail-smashingstocks-flat-smashing-stocks.png" />
      </Flex>
    );
  }

  return (
    <Flex flexDirection={"column"} padding="20">
      {polls.map((x) => {
        return (
          <Flex
            backgroundColor={"#fff"}
            margin="1"
            alignItems={"center"}
            textAlign="center"
            borderRadius={"25"}
            padding="10"
            flexDirection={"row"}
            justifyContent="space-between"
            shadow={"md"}
            key={x.key}
          >
            <Heading> {x.data().title}</Heading>
            <Flex>
              <Button
                mr="10
              "
              >
                {getTotalVote(x.data().options)} votes
              </Button>
              <Link to={`/viewpoll/${x.id}`}>
                <Button>
                  <IconButton icon={<EditIcon />} ml="2" isRound={true} />
                  View Details
                </Button>
              </Link>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default RenderPolls;
