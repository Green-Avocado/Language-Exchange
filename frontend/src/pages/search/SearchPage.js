// import * as React from "react";
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
  Container,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Button,
  VStack,
} from "@chakra-ui/react";
import { onValue } from "firebase/database";
import { usersRef } from "../../firebase";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export const SearchPage = () => {
  const [range, setRange] = useState([18, 22]);
  const user = {
    avatar: "https://avatars.dicebear.com/api/jdenticon/string.svg",
    name: "John",
    age: 19,
    language: "Spanish",
    experience: "Beginner",
    gender: "Male",
    location: "Vancouver",
    wantToLearn: true,
    wantToHelp: false,
  };

  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });

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
            <Select id='search-gender' placeholder='Select a gender'>
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
            <FormLabel htmlFor='search-location'>Location:</FormLabel>
            <Select placeholder='Select'>
              <option value='search-vancouver'>Vancouver</option>
              <option value='search-toronto'>Toronto</option>
            </Select>

            <Button type='search'>Search for matches!</Button>
          </FormControl>
        </VStack>
        <VStack>
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
              <Avatar size='xl' src={user.avatar} />
              <Text fontWeight='bold' fontSize='xl'>
                {user.name}
              </Text>
              <Text fontSize='lg'>Age: {user.age}</Text>
              <Text fontSize='lg'>
                {user.language} ({user.experience})
              </Text>
              <Text fontSize='lg'>{user.gender}</Text>
              <Text fontSize='lg'>{user.location}</Text>
              <Checkbox
                color='black'
                isDisabled
                defaultIsChecked={user.wantToLearn}
              >
                Want to learn
              </Checkbox>
              <Checkbox
                color='black'
                isDisabled
                defaultIsChecked={user.wantToHelp}
              >
                Want to help
              </Checkbox>
            </VStack>
          </Box>
          <HStack>
            <IconButton variant='outline' icon={<CloseIcon />} />
            <IconButton colorScheme='red' icon={<CheckIcon />} />
          </HStack>
        </VStack>
      </HStack>
      {/* </Center> */}
    </Flex>
  );
};
