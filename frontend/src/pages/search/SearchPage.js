import { useState, useEffect } from "react";
import {
  Flex,
  Avatar,
  Box,
  Text,
  Center,
  FormControl,
  FormLabel,
  Select,
  IconButton,
  Checkbox,
  HStack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Button,
  VStack,
  Tag,
  Spinner,
} from "@chakra-ui/react";
import { onValue } from "firebase/database";
import { usersRef } from "../../firebase";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { getAuth, onAuthStateChanged } from "firebase/auth"

const auth = getAuth();
let account;
let users, setUsers;

onAuthStateChanged(auth, async (user) => {
    account = user
    if (user) {
        console.log(user.uid);
    }
});

export const SearchPage = () => {
  const [range, setRange] = useState([18, 22]);
  [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUsers([...Object.values(data)]);
      setLoading(false);
    });
  }, []);

  const nextUser = () => {
    let temp = [...users];

      console.log(temp);
    temp.splice(0, 1);
      if (account) {
        temp = temp.filter((x) => x.name != account.displayName);
      }
      console.log(temp);
    setUsers(temp);
  };

  const handleAccept = () => {
    // do db update
    nextUser();
  };

  const handleReject = () => {
    // do db update
    nextUser();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex justify='space-evenly'>
      {/* <Center> */}
      <HStack spacing='100px'>
        <VStack spacing='30px' width='300px'>
          <Text fontWeight='bold' fontSize='2xl'>
            Search for:{" "}
          </Text>
          <FormControl spacing='30px'>
            <FormLabel htmlFor='search-language'>Language:</FormLabel>
            <Select mb={3} placeholder='Select language'>
              <option value='search-spanish'>Spanish</option>
              <option value='search-chinese'>Chinese</option>
              <option value='search-french'>French</option>
            </Select>

            <FormLabel htmlFor='search-age'>Age range:</FormLabel>
            <RangeSlider
              id='search-age'
              defaultValue={range}
              min={16}
              max={70}
              step={1}
              value={range}
              onChange={(value) => setRange(value)}
            >
              <RangeSliderTrack bg='red.100'>
                <RangeSliderFilledTrack bg='tomato' />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0}>
                <Box>{range[0]}</Box>
              </RangeSliderThumb>
              <RangeSliderThumb boxSize={6} index={1}>
                <Box>{range[1]}</Box>
              </RangeSliderThumb>
            </RangeSlider>

            <FormLabel htmlFor='search-experience'>Experience level:</FormLabel>
            <Select placeholder='Select'>
              <option value='search-beginner'>Beginner</option>
              <option value='search-intermediate'>Intermediate</option>
              <option value='search-advanced'>Advanced</option>
            </Select>

            <FormLabel htmlFor='search-gender'>Gender:</FormLabel>
            <Select mb={3} id='search-gender' placeholder='Select a gender'>
              <option value='search-any'>Any</option>
              <option value='search-male'>Male</option>
              <option value='search-female'>Female</option>
            </Select>

            <HStack spacing='20px'>
              <Checkbox colorScheme='orange' value='search-learn'>
                Want to learn
              </Checkbox>
              <Checkbox colorScheme='green' value='search-help'>
                Want to help
              </Checkbox>
            </HStack>
            <FormLabel mt={3} htmlFor='search-location'>Location:</FormLabel>
            <Select placeholder='Select'>
              <option value='search-vancouver'>Vancouver</option>
              <option value='search-toronto'>Toronto</option>
            </Select>

            <Button mt={3} type='search'>Search for matches!</Button>
          </FormControl>
        </VStack>
        <VStack>
          {users.length > 0 ? (
            <>
              <Box
                width='350px'
                padding={8}
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                borderWidth='3px'
                borderRadius='lg'
                overflow='hidden'
              >
                <VStack>
                  <Avatar size='xl' src={users[0].avatar} />
                  <Text fontWeight='bold' fontSize='xl'>
                    {users[0].name}
                  </Text>
                  <Text fontSize='lg'>Age: {users[0].age}</Text>
                  <Text fontSize='lg'>{users[0].gender}</Text>
                  <Text fontSize='lg'>{users[0].location}</Text>

                  {users[0].languages.map((l, index) => (
                    <Tag key={index} p='4'>
                      <VStack>
                        <Text fontSize='lg'>
                          {l.language} ({l.experience})
                        </Text>
                        <HStack>
                          {l.wantToLearn && (
                            <Tag colorScheme='blue'>Want to learn</Tag>
                          )}

                          <Tag colorScheme='green'>Want to help</Tag>
                        </HStack>
                      </VStack>
                    </Tag>
                  ))}
                </VStack>
              </Box>
              <HStack>
                <IconButton
                  variant='outline'
                  icon={<CloseIcon />}
                  onClick={handleReject}
                />
                <IconButton
                  colorScheme='red'
                  icon={<CheckIcon />}
                  onClick={handleAccept}
                />
              </HStack>{" "}
            </>
          ) : (
            <Center>No more profiles</Center>
          )}
        </VStack>
      </HStack>
    </Flex>
  );
};
