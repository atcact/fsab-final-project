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
import { Button, Input, Textarea, VStack } from "@chakra-ui/react";
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

    // TODO: Make a POST request with the form data to the /posts endpoint
    axios
      .post("http://localhost:8080/posts", {
        title: e.target.name.value,
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

  // TODO: Implement a modal for creating a new post
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Create new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <Input required name="title" placeholder="Post title" />
              <Textarea required name="body" placeholder="Post body" />
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
