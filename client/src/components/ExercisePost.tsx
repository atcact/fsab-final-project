import { Box, Divider, Text, VStack, Flex, IconButton } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa"; 
import { useState } from "react";
import axios from "axios";

interface ExerciseProps {
  _id: string;
  title: string;
  workout: string;
  time: number;
  body: string;
  postedAt: Date;
}

const ExercisePost = ({ _id, title, workout, time, body, postedAt }: ExerciseProps) => {
  const [isLoading, setIsLoading] = useState(false);

  function deletePost() {

    // Set isLoading to true while we make the API request.
    setIsLoading(true);
    console.log("post key ", _id, " workout", workout);

    axios
      .delete(`http://localhost:8080/exercises/${_id}`)
      .then(function (response) {
        // handle success
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
    <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p={4}>
        <Text fontSize="xl" fontWeight={600}>
          {workout} - {time} minutes
        </Text>
      </Box>
      <Divider />
      <Box p={4}>
        <Text fontSize="md" fontWeight={600}>
          Details
        </Text>
        <VStack>
          <Text>
            {body}
          </Text>
          <Text fontSize="sm" fontWeight={400} fontStyle={"italic"}>
            {/* at {postedAt.getDay()}/{postedAt.getMonth() + 1}/{postedAt.getFullYear()} */}
            {/* at {postedAt.getHours().toString().padStart(2, "0")}:{postedAt.getMinutes().toString().padStart(2, "0")} on {postedAt.getDate()}/{postedAt.getMonth() + 1}/{postedAt.getFullYear()} */}
          </Text>
        </VStack>
      </Box>
      <Flex justify="flex-end" p={4}>
        <IconButton
          icon={<FaTimes />}
          onClick={() => deletePost()}
          aria-label="Delete"
          isLoading={isLoading}
        />
      </Flex>
    </Box>
  );
};


export default ExercisePost;
