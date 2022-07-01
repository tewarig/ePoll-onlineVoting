import {
  Box,
  Heading,
  Progress,
  Flex,
  Button,
  Input,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../module/firebase";
import RenderPolls from "../dashboard/renderPolls";
import { prettyDOM } from "@testing-library/react";

const View = () => {
  const { viewPoll } = useParams();
  const [poll, setPoll] = useState(null);
  const [docId, setDocId] = useState(null);
  async function getPoll() {
    const docRef = doc(db, "polls", viewPoll);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPoll(docSnap.data());
      setDocId(docSnap.id);
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getPoll();
  }, []);

  const totalView = useMemo(() => {
    if (!poll) {
      return 0;
    }
    let total = 0;
    poll.options.forEach((option) => {
      total += option.votes;
    });
    return total;
  }, [poll]);
  const calculatePercentage = (vote) => {
    if ((vote == totalView) == 0) {
      return "0";
    }
    const per = (vote / totalView) * 100;
    if (per >= 0 && per <= 100) {
      return per;
    }
    return 0;
  };
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  if (!poll) {
    return <Heading>Loading....</Heading>;
  }
  const link = `${process.env.REACT_APP_DOMAIN}/poll/${docId}`;
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
            <Flex
              ml="20"
              mr="20"
              alignItems={"center"}
              textAlign="center"
            ></Flex>
          </Box>

          <Heading> {poll.title}</Heading>

          <Flex
            width={"100%"}
            flexDirection="column"
            alignContent={"center"}
            textAlign="center"
            alignItems={"center"}
            mb="20"
          >
            <Flex width={"80%"} alignSelf="center" ml="30%" mt="5">
              <Box
                alignContent={"center"}
                justifyContent="center"
                textAlign={"center"}
              >
                <Heading size={"sm"} mt="3%">
                  {link}
                </Heading>
              </Box>
              <IconButton
                icon={
                  <AttachmentIcon onClick={() => copyTextToClipboard(link)} />
                }
              />
            </Flex>
            <Flex mt="10">
              <Heading>
                {" "}
                {totalView} {totalView > 0 ? "vote" : "votes"}
              </Heading>
            </Flex>
            {poll.options.map((option) => (
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
                    {parseInt(calculatePercentage(option.votes))} %
                  </Button>
                </Flex>
                <Progress
                  value={calculatePercentage(option.votes)}
                  colorScheme="green"
                  backgroundColor={"white"}
                  borderRadius="25"
                />
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>
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
        <Heading>
          Votes
          <Divider mt="5" backgroundColor={"#fff"} />
          {poll.votes.map((user) => (
            <Flex
              justifyContent={"space-between"}
              backgroundColor="#fff"
              margin="25"
              padding={"25"}
              borderRadius="25"
            >
              <Heading size={"md"}>{user.userEmail}</Heading>
              <Button> {poll.options[user.optionId].value}</Button>
            </Flex>
          ))}
        </Heading>
      </Box>
    </Box>
  );
};
export default View;
