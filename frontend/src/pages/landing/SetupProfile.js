import { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Center,
  Container,
  FormControl,
  Input,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Select,
  Avatar,
  Checkbox,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";

const LanguageInput = ({ l, removeLanguage, editLanguage, index }) => {
  const handleChange = (e, type) => {
    console.log(e.target);
    editLanguage(type, e.target.value, index);
  };

  return (
    <Box borderWidth={1} p='4' mb='4'>
      <VStack>
        <FormLabel htmlFor='language'>Language</FormLabel>
        <Select
          placeholder='Select'
          onChange={(e) => handleChange(e, "language")}
          value={l.language}
        >
          <option value='spanish'>Spanish</option>
          <option value='chinese'>Chinese</option>
          <option value='french'>French</option>
        </Select>
        <FormLabel htmlFor='experience'>Experience level:</FormLabel>
        <Select
          placeholder='Select'
          onChange={(e) => handleChange(e, "experience")}
          value={l.experience}
        >
          <option value='Beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>
          <option value='advanced'>Advanced</option>
        </Select>

        <Checkbox
          colorScheme='orange'
          onChange={(e) => handleChange(e, "wantToLearn")}
          value={l.wantToLearn}
        >
          Want to learn
        </Checkbox>
        <Checkbox
          colorScheme='green'
          onChange={(e) => handleChange(e, "wantToHelp")}
          value={l.wantToHelp}
        >
          Want to help
        </Checkbox>

        <Button colorScheme='blue' onClick={() => removeLanguage(index)}>
          Remove
        </Button>
      </VStack>
    </Box>
  );
};

export const SetupProfile = () => {
  const [avatarKey, setAvatarKey] = useState("https://bit.ly/broken-link");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(16);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState([]);

  const generateAvatarKey = () => {
    setAvatarKey(`https://avatars.dicebear.com/api/jdenticon/${nanoid()}.svg`);
  };

  const addLanguage = () => {
    const obj = {
      language: "",
      experience: "",
      wantToLearn: "true",
      wantToHelp: "true",
    };
    const temp = [...languages, obj];
    setLanguages(temp);
  };

  const editLanguage = (type, value, index) => {
    const temp = [...languages];
    temp[index][type] = value;
    setLanguages(temp);
  };

  const removeLanguage = (index) => {
    const temp = languages.splice(index, 1);
    setLanguages(temp);
  };

  const submitData = () => {
    console.log(email);
    console.log(name);
    console.log(age);
    console.log(gender);
    console.log(languages);
    console.log(location);
  };

  return (
    <Container>
      <Center>
        <VStack w='100%' spacing='10px'>
          <Text fontSize='3xl'>Set up your profile: </Text>
          <FormControl>
            <FormLabel htmlFor='email'>Email address:</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormLabel htmlFor='name'>Name:</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />

            <FormLabel htmlFor='age'>Age:</FormLabel>
            <NumberInput defaultValue={16} min={10} max={100}>
              <NumberInputField
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <FormLabel htmlFor='gender'>Gender:</FormLabel>
            <Select
              placeholder='Select'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='prefer-not-say'>Prefer not say</option>
            </Select>

            <FormLabel htmlFor='location'>Location:</FormLabel>
            <Select
              placeholder='Select'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value='vancouver'>Vancouver</option>
              <option value='toronto'>Toronto</option>
            </Select>

            <Button colorScheme='blue' onClick={addLanguage}>
              Add Language
            </Button>
            {languages.map((l, index) => (
              <LanguageInput
                key={l}
                l={l}
                editLanguage={editLanguage}
                removeLanguage={removeLanguage}
                index={index}
              />
            ))}
          </FormControl>

          <Button colorScheme='blue' onClick={generateAvatarKey}>
            Generate avatar
          </Button>
          <Avatar size='xl' src={avatarKey} />
          <Button colorScheme='teal' onClick={submitData}>
            Get Started
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};
