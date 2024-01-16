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
import { Button, Input, Textarea, VStack, SimpleGrid, Box } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import axios from "axios";
// import { error } from "console";

// require("dotenv").config();

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewPromptModal = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [LLMOutput, setLLMOutput] = useState("...");


  function handleSubmit(e: any) {
    // Block the default form handler behavior.
    e.preventDefault();

    // Set isLoading to true while we make the API request.
    setIsLoading(true);

    var workoutPrompt = `I'm ${e.target.ft.value} ft ${e.target.in.value} in and ${e.target.lbs.value} lbs.`;
    workoutPrompt += ` My fitness goal is: ${e.target.goal.value}. Suggest me a simple workout plan.`;
    
    const options = {
      method: 'POST',
      url: 'https://api.cohere.ai/v1/generate',
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json', 
        authorization: 'Bearer pDuCW23nZGCoPLO6Cxs4G6iTdoHCviFK88Ut3UrF'
      },
      data: {
        prompt: workoutPrompt,
        max_tokens: 512, 
        truncate: 'END', 
        return_likelihoods: 'NONE'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.generations[0].text);
        setLLMOutput(response.data.generations[0].text);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .post("http://localhost:8080/suggestions", {
        ft: e.target.ft.value,
        in: e.target.in.value,
        lbs: e.target.lbs.value,
        goal: e.target.goal.value,
        suggestion: LLMOutput
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
          <ModalHeader>Get workout suggestion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <text>Height</text>
              <SimpleGrid columns={2} spacing={5}>
                <NumberInput step={1} defaultValue={5} min={1} max={10}>
                  <NumberInputField required name="ft" placeholder="ft"/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Box>ft</Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={5}>
                <NumberInput step={1} defaultValue={8} min={0} max={12}>
                  <NumberInputField required name="in" placeholder="in"/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Box>in</Box>
              </SimpleGrid>
              <text>Weight</text>
              <SimpleGrid columns={2} spacing={5}>
                <NumberInput step={1} defaultValue={150} min={1} max={500}>
                  <NumberInputField required name="lbs" placeholder="lbs"/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Box>lbs</Box>
              </SimpleGrid>
              {/* <NumberInput step={1} defaultValue={150} min={1} max={500}>
                <NumberInputField required name="lbs" placeholder="lbs"/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput> */}
              <text>Describe your desired fitness:</text>
              <Textarea required name="goal"/>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default NewPromptModal;
