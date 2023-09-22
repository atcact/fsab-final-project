import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, Box, SimpleGrid, Textarea, VStack, Select } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import axios from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);


  function handleSubmit(e: any) {
    // Block the default form handler behavior.
    e.preventDefault();

    // Set isLoading to true while we make the API request.
    setIsLoading(true);

    axios
      .post("http://localhost:8080/exercises", {
        title: e.target.title.value,
        workout: e.target.workout.value,
        time: e.target.time.value,
        body: e.target.body.value,
      })
      .then(function (response) {
        // handle success
        onClose();
        window.location.reload();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      });
  }


  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Add new workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              {/* <Input required name="title" placeholder=" title" /> */}
              <Select required name="workout" placeholder='Select workout'>
                <option value='Running'>Running</option>
                <option value='Cycling'>Cycling</option>
                <option value='Weightlifting'>Weightlifting</option>
                <option value='Swimming'>Swimming</option>
                <option value='Rowing'>Rowing</option>
              </Select>
              <text>Duration</text>
              <SimpleGrid columns={2} spacing={5}>
                <NumberInput step={5} defaultValue={15} min={5} max={60}>
                  <NumberInputField required name="time" placeholder="minutes"/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Box>in</Box>
              </SimpleGrid>
              <Textarea required name="body" placeholder="Note" />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NewPostModal;
