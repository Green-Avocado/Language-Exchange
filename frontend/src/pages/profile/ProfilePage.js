import { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Center,
  Flex,
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
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth"
import { readUserData, updateUserData } from "../../firebase.js"

let avatarKey, setAvatarKey;
let email, setEmail;
let name, setName;
let age, setAge;
let gender, setGender;
let location, setLocation;
let languages, setLanguages;


const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user.uid);
        let data = await readUserData(user.uid);

        setGender(data.gender);
        setAge(data.age);
        setLocation(data.location);
        setLanguages(data.languages);

        setEmail(user.email);
        setName(user.displayName);
        setAvatarKey(user.photoURL);
    }
});

const LanguageInput = ({ l, removeLanguage, editLanguage, index }) => {
  const handleChange = (e, type) => {
    if (type.includes("wantTo")) {
      editLanguage(type, e.target.checked, index);
    } else {
      editLanguage(type, e.target.value, index);
    }
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
          <option value='english'>English</option>
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

        <FormLabel htmlFor='wantToLearn'>Want to learn:</FormLabel>
      <input
        type="checkbox"
        onChange={(e) => handleChange(e, "wantToLearn")}
        value={l.wantToLearn}
      />

        <FormLabel htmlFor='wantToHelp'>Want to help:</FormLabel>
      <input
        type="checkbox"
        onChange={(e) => handleChange(e, "wantToHelp")}
        value={l.wantToHelp}
      />

        <Button onClick={() => removeLanguage(index)}>Remove</Button>
      </VStack>
    </Box>
  );
};

export const ProfilePage = () => {
    [avatarKey, setAvatarKey] = useState();
    [email, setEmail] = useState();
    [name, setName] = useState();
    [age, setAge] = useState(0);
    [gender, setGender] = useState();
    [location, setLocation] = useState();
    [languages, setLanguages] = useState([]);

  const generateAvatarKey = () => {
    setAvatarKey(`https://avatars.dicebear.com/api/jdenticon/${nanoid()}.svg`);
  };

  const addLanguage = () => {
    const obj = {
      language: "",
      experience: "",
      wantToLearn: true,
      wantToHelp: true,
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
    let temp = [...languages];
    temp.splice(index, 1);
    setLanguages(temp);
  };

  const submitData = async () => {
    const data = {
      'name': name,
      'age': age,
      'gender': gender,
      'avatar': avatarKey,
      'languages': languages,
      'location': location,
    };
    console.log(data);

    if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: avatarKey,
        });

        await updateUserData(auth.currentUser.uid, data);
    }

      window.location = "/search";
  };

  return (
    <Flex justify='space-evenly' minW='50vw'>
      <Box w='50%'>
        <VStack>
          <Text fontSize='3xl'>Your profile: </Text>
          <FormControl>
            <FormLabel htmlFor='email'>Email address:</FormLabel>
            <Input
              id='email-input'
              disabled='true'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormLabel htmlFor='name'>Name:</FormLabel>
            <Input id='name-input' value={name} onChange={(e) => setName(e.target.value)} />

            <FormLabel htmlFor='age'>Age:</FormLabel>
            <Input
              id='age-input'
              type='number'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <FormLabel htmlFor='gender'>Gender:</FormLabel>
            <Select
              placeholder='Select'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Prefer not to say'>Prefer not to say</option>
            </Select>

            <FormLabel htmlFor='location'>Location:</FormLabel>
            <Select
              placeholder='Select'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value='Vancouver'>Vancouver</option>
              <option value='Toronto'>Toronto</option>
            </Select>
          </FormControl>
        </VStack>
      </Box>

      <Box w='400px'>
        <VStack>
          <Button colorScheme='blue' onClick={addLanguage} mb='3' mt='3'>
            Add Language
          </Button>
          {languages.map((l, index) => (
            <LanguageInput
              key={index}
              l={l}
              editLanguage={editLanguage}
              removeLanguage={removeLanguage}
              index={index}
            />
          ))}
          <Button colorScheme='blue' onClick={generateAvatarKey}>
            Generate avatar
          </Button>
          <Avatar id='avatar' size='xl' src={avatarKey} />
          <Button colorScheme='teal' onClick={submitData}>
            Get Started
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
