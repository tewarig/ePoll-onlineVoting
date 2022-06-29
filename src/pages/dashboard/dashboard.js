import {
  Button,
  Heading,
  IconButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState, useRef, useId } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
import EditableInput from "../../comp/editableInput/editableInput";
import TickInput from "../../comp/tickInput/tickInput";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { CloseIcon } from "@chakra-ui/icons";
import { db } from "../../module/firebase";
import { v4 as uuidv4 } from "uuid";
import GetUserData from "../../hooks/userData";

function DashBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pollQuestion, setPollQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [showAddValue, setAddValue] = useState(false);
  const [value, setValue] = useState("");
  const { user } = GetUserData();

  const question = useRef();
  const addValue = (value, id) => {
    setOptions([...options, { id: id, value: value, votes: 0 }]);
    setAddValue(false);
  };
  const deleteOption = (id) => {
    setOptions(options.filter((option) => option.id !== id));
  };
  const addAPoll = async (title, options) => {
    const id = uuidv4();

    const data = doc(db, "polls", id);
    const poll = await setDoc(data, {
      title: title,
      options: options,
      email: user.email,
    
    });
    setValue(""); 
    setOptions([]);
    onClose();
  };
  const addToFireStore = () => {
    addAPoll(value, options);
  };

  return (
    <div>
      <Button onClick={onOpen}>
        {" "}
        <IconButton>
          <AddIcon color="#D9D9D9" />
        </IconButton>
        Add A Poll
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create A Poll</DrawerHeader>

          <DrawerBody>
            <Heading inputValue={question}>{pollQuestion}</Heading>
            <EditableInput value={value} setValue={setValue} />
            <Box mt="100">
              {options.map((option) => {
                return (
                  <Flex>
                    <Box
                      backgroundColor={"gray.100"}
                      borderRadius="5"
                      mb="2"
                      padding={"2"}
                      textAlign="center"
                      justifyContent={"center"}
                      flexDirection="row"
                      width={"80%"}
                    >
                      <Heading key={options} size="m">
                        {" "}
                        {option.value}
                      </Heading>
                    </Box>
                    <IconButton
                      icon={<CloseIcon />}
                      onClick={() => deleteOption(option.id)}
                      backgroundColor="red.400"
                    ></IconButton>
                  </Flex>
                );
              })}
              <Button
                onClick={() => {
                  setAddValue((addValue) => !addValue);
                }}
              >
                {!showAddValue ? "Add a option" : " Remove last option"}
              </Button>
              {showAddValue ? (
                <TickInput onClickFunction={addValue} value={options} />
              ) : null}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={addToFireStore}>
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default DashBoard;
