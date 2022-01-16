// import * as React from "react";
import { useState } from "react";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  HStack,
  Container,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Button,
  VStack
} from "@chakra-ui/react";

export const SearchPage = () => {
  const [range, setRange] = useState([18, 22])
  const user = {
      avatar: null,
      name: null,
      age: null,
      language: null,
      experience: null
  }
  
  return (
    <Container>
      <Center>
        <HStack>
          <VStack>
            Search for:
            <FormControl>
              <FormLabel htmlFor="search-language">Language:</FormLabel>
              <Select
                placeholder="Select language">
                <option value='search-spanish'>Spanish</option>
                <option value='search-chinese'>Chinese</option>
                <option value='search-french'>French</option>
              </Select>

              <FormLabel htmlFor="search-age">Age range:</FormLabel>
              <RangeSlider id="search-age" defaultValue={range} min={16} max={70} step={1} value={range} onChange={(value) => setRange(value)}>
                <RangeSliderTrack bg='red.100'>
                  <RangeSliderFilledTrack bg='tomato' />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}>
                  <Box>
                    {range[0]}
                  </Box>
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={6} index={1}>
                  <Box>
                    {range[1]}
                  </Box>
                </RangeSliderThumb>
              </RangeSlider>

              <FormLabel htmlFor='search-experience'>Experience level:</FormLabel>
              <Select
                placeholder='Select'
              >
                <option value='search-beginner'>Beginner</option>
                <option value='search-intermediate'>Intermediate</option>
                <option value='search-advanced'>Advanced</option>
              </Select>

              <FormLabel htmlFor="search-gender">Gender:</FormLabel>
              <Select id="search-gender" placeholder="Select a gender">
                <option value='search-any'>Any</option>
                <option value='search-male'>Male</option>
                <option value='search-female'>Female</option>
              </Select>
        
              <HStack spacing='20px'>
                <Checkbox
                  colorScheme='orange'
                  value='search-learn'
                >
                  Want to learn
                </Checkbox>
                <Checkbox
                  colorScheme='green'
                  value='search-help'
                >
                  Want to help
                </Checkbox>
              </HStack>
              <FormLabel htmlFor='search-location'>Location:</FormLabel>
              <Select
                placeholder='Select'
              >
                <option value='search-vancouver'>Vancouver</option>
                <option value='search-toronto'>Toronto</option>
              </Select>

              <Button type="search">Search for matches!</Button>
            </FormControl>
          </VStack>

        </HStack>
      </Center>

    </Container>
  );
};
