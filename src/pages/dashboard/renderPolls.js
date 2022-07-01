import { Flex, Heading, Box, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { UserState } from "../../context";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useMediaQuery } from "@chakra-ui/react";

function RenderPolls() {
  const polls = UserState();
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

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
        padding={isLargerThan1000 ? "20" : "0"}
        alignContent={"center"}
        alignItems={"center"}
        margin={isLargerThan1000 ? "20" : "0"}
      >
        <Heading>No Polls Found please create a new One </Heading>
        <img src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/344/external-page-not-found-shopping-and-retail-smashingstocks-flat-smashing-stocks.png" />
      </Flex>
    );
  }

  return (
    <Flex flexDirection={"column"} padding={isLargerThan1000 ? "20" : "5"}>
      {polls.map((x) => {
        return (
          <Flex
            backgroundColor={"#fff"}
            margin="1"
            alignItems={"center"}
            textAlign="center"
            borderRadius={"25"}
            padding={isLargerThan1000 ? "10" : "0"}
            flexDirection={"row"}
            justifyContent="space-between"
            shadow={"md"}
            key={x.key}
          >
            <Heading
              ml={isLargerThan1000 ? "0" : "2"}
              size={isLargerThan1000 ? "xl" : "sm"}
            >
              {" "}
              {x.data().title}
            </Heading>
            <Flex
              flexDirection={isLargerThan1000 ? "row" : "column"}
              padding={isLargerThan1000 ? "0" : "5"}
            >
              <Button
                mr={isLargerThan1000 ? "10" : "0"}
                mb={isLargerThan1000 ? "0" : "1"}
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
