import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Heading,
  Progress,
  Flex,
  Button,
  Input,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../module/firebase";
import { useParams } from "react-router-dom";
import GetUserData from "../../hooks/userData";
import HandleAuth from "../../comp/navBar/signUser/handlauth";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useMediaQuery } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function Poll() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const { user } = GetUserData();
  const { width, height } = useWindowSize();
  const [isVotes, setVoted] = useState(false);
  const [id, setId] = useState(null);
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  async function getPoll() {
    const docRef = doc(db, "polls", pollId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPoll(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  useEffect(() => {
    if (id) {
      setTimeout(() => {
        getPoll();
      }, 8000);
    } else {
      getPoll();
    }
  }, [id]);

  async function vote(optionId) {
    const docRef = doc(db, "polls", pollId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    let newOptions = data.options;
    newOptions[optionId].votes++;
    const newVotes = data.votes;
    const userEmail = user.email ? user.email : "anonymous";
    newVotes.push({ userEmail, optionId });

    const newData = { ...data, votes: newVotes, options: newOptions };
    const poll = await setDoc(docRef, newData);
    setId(optionId);
    setVoted(true);
    setTimeout(() => {
      setVoted(false);
    }, 10000);
    toast.success("Your vote have been added");
  }

  function voted(user, poll) {
    if (user) {
      if (poll && poll.votes) {
        return poll.votes.some((vote) => vote.userEmail === user.email);
      }
    }
    return false;
  }

  const isUserVoted = useMemo(() => voted(user, poll), [user, poll]);

  if (isVotes) {
    return (
      <Box alignItems={"center"}>
        {isVotes && <Confetti width={width} height={height} />}
        <Box
          backgroundColor="#f2f2f2"
          borderRadius={"10"}
          mt="5"
          padding={isLargerThan1000 ? "10" : "2"}
          alignItems={"center"}
          textAlign="center"
          alignSelf={"center"}
          ml={isLargerThan1000 ? "100" : "2"}
          boxShadow="xs"
        >
          <Heading>{poll.title}</Heading>
          <Flex flexDirection={"column"} mt="5">
            {poll.options.map((option) => (
              <Button
                margin={isLargerThan1000 ? "2" : "1"}
                padding={isLargerThan1000 ? "8" : "5"}
                colorScheme={option.id == id ? "blue" : "gray"}
                onClick={() => vote(option.id)}
              >
                <Heading>{option.value}</Heading>
              </Button>
            ))}
          </Flex>
        </Box>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box alignContent={"center"} alignItems={"center"}>
        <Box
          width={"300px"}
          height="500px"
          ml={isLargerThan1000 ? "40%" : "15%"}
        >
          <HandleAuth></HandleAuth>;
        </Box>
      </Box>
    );
  }

  if (isUserVoted) {
    return (
      <Box alignItems={"center"} justifyContent="center">
        <Heading margin="50">
          Hi , {user.email} You have aleady have voted :)
        </Heading>
      </Box>
    );
  }
  if (!poll) {
    return (
      <Stack
        width={"80%"}
        ml={isLargerThan1000 ? "10%" : "10%"}
        mt={isLargerThan1000 ? "50" : "0"}
      >
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    );
  }

  return (
    <Box alignItems={"center"}>
      {isVotes && <Confetti width={width} height={height} />}
      <Box
        backgroundColor="#f2f2f2"
        borderRadius={"10"}
        mt={isLargerThan1000 ? "5%" : "2%"}
        padding={isLargerThan1000 ? "10" : "2"}
        alignItems={"center"}
        textAlign="center"
        alignSelf={"center"}
        ml={isLargerThan1000 ? "5%" : "2"}
        mr={isLargerThan1000 ? "5%" : "2"}
        boxShadow="xs"
      >
        <Heading>{poll.title}</Heading>
        <Flex flexDirection={"column"} mt="5">
          {poll.options.map((option) => (
            <Button
              margin={isLargerThan1000 ? "2" : "1"}
              padding={isLargerThan1000 ? "8" : "5"}
              colorScheme="blue"
              onClick={() => vote(option.id)}
            >
              <Heading>{option.value}</Heading>
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
