import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Heading,
  Progress,
  Flex,
  Button,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../module/firebase";
import { useParams } from "react-router-dom";
import GetUserData from "../../hooks/userData";

export default function Poll() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const { user } = GetUserData();
  async function getPoll() {
    const docRef = doc(db, "polls", pollId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPoll(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  useEffect(()=>{
    getPoll();

  },[])


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
    setPoll(poll.data());
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
  console.log(poll);

  if (!poll) {
    return <Heading>Loading...</Heading>;
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
        <Heading>{poll.title}</Heading>
        <Flex flexDirection={"column"} mt="5">
          {poll.options.map((option) => (
            <Button
              margin={"2"}
              padding={"8"}
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
