import { Box, Flex, Center, Button, Spinner, VStack, Text, Image} from "@chakra-ui/react";
import { login } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export const LandingPage = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    navigate("/profile");
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex justify='space-between'>
      <Box minW='xl' w='100%' minH='100vh' bg='#e2eafc' p='4'>
        <VStack>
          <Text fontSize='2xl' fontWeight='bold'>Language Exchange</Text>
          <Text padding='20px' ml='100px'>Learning a language by yourself is hard. Connect with 
            others to make your language learning journey more fun!
          </Text>
          <Text fontStyle='italic'>The Tinder and Bumble for language exchange.</Text>
        </VStack>
        
      </Box>
      <Box minW='xl' w='100%' minH='100%' p='4'>
        <Center>
          <VStack>
            <Text>Sign in to create or modify your profile!</Text>
          <Button onClick={login}>Sign in with Google</Button>
          </VStack>
        </Center>
      </Box>
    </Flex>
  );
};
