'use client';
import { FormEvent } from 'react';
import { usePathname } from 'next/navigation';
import type { InputJSONType } from '@/lib/types';
import {
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  ChakraProvider,
  VStack,
  Stack,
  Input,
  Select,
  Radio,
  RadioGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardHeader,
  Heading,
  Button,
} from '@chakra-ui/react';
import { saveForm } from '@/lib/utils';

interface FormGeneratedByUserProps {
  formFields: InputJSONType[];
  formName: string;
}

export const FormGeneratedByUser = ({ formFields, formName }: FormGeneratedByUserProps) => {
  const pathname = usePathname();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (pathname.startsWith('/edit-your-form/')) {
      console.log('formularz wypełniony poprawnie'); //TODO:
    } else {
      formData.forEach((value, key) => {
        console.log(key, value); //TODO:
      });
    }
  };

  return (
    <ChakraProvider>
      <Card align="center" padding="20px">
        <VStack spacing={8} justifyContent={'center'} alignItems={'center'}>
          <CardHeader>
            <Heading size="md">{formName}</Heading>
          </CardHeader>
          <form onSubmit={onSubmit}>
            <VStack spacing={4}>
              {formFields.map((input) => {
                switch (input.type) {
                  case 'checkbox':
                    if (!input.options || input.options?.length < 2) {
                      return (
                        <FormControl isRequired={input.required} key={input.keyID}>
                          <FormLabel>{input.label}</FormLabel>
                          <Checkbox isRequired={input.required} name={input.name}></Checkbox>
                        </FormControl>
                      );
                    }
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <CheckboxGroup>
                          <Stack spacing={[1, 5]} direction={['column', 'row']} flexWrap={'wrap'}>
                            {input.options.map((option, index) => (
                              <Checkbox
                                key={input.keyID + index}
                                name={`${input.name}.${option}`}
                                value={option}
                              >
                                {option}
                              </Checkbox>
                            ))}
                          </Stack>
                        </CheckboxGroup>
                      </FormControl>
                    );
                  case 'color':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="color" name={input.name} />
                      </FormControl>
                    );
                  case 'date':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="date" name={input.name} />
                      </FormControl>
                    );
                  case 'email':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="email" name={input.name} />
                      </FormControl>
                    );
                  case 'password':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="password" name={input.name} />
                      </FormControl>
                    );
                  case 'number':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <NumberInput min={input.minValue} max={input.maxValue}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    );
                  case 'text':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="text" name={input.name} placeholder={input.placeholder} />
                      </FormControl>
                    );
                  case 'time':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel> <Input type="time" name={input.name} />
                        ;
                      </FormControl>
                    );
                  case 'url':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="url" name={input.name} />;
                      </FormControl>
                    );
                  case 'week':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel> <Input type="week" name={input.name} />
                        ;
                      </FormControl>
                    );
                  case 'month':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="month" name={input.name} />;
                      </FormControl>
                    );
                  case 'tel':
                    return (
                      <FormControl isRequired={input.required} key={input.keyID}>
                        <FormLabel>{input.label}</FormLabel>
                        <Input type="tel" name={input.name} />;
                      </FormControl>
                    );
                  case 'select': {
                    if (input.options) {
                      return (
                        <FormControl isRequired={input.required} key={input.keyID}>
                          <FormLabel>{input.label}</FormLabel>
                          <Select placeholder="Select option">
                            {input?.options.map((option, index) => (
                              <option key={input.keyID + option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      );
                    }
                  }
                  case 'radio':
                    if (input.options) {
                      return (
                        <FormControl isRequired={input.required} key={input.keyID}>
                          <FormLabel>{input.label}</FormLabel>
                          <RadioGroup name={input.name}>
                            <Stack direction="row" flexWrap={'wrap'}>
                              {input?.options.map((option, index) => (
                                <Radio key={input.keyID + index} value={option.toString()}>
                                  {option}
                                </Radio>
                              ))}
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      );
                    }

                  default:
                    <p key={input.keyID}> UNEXPECTED TYPE OF FIELD </p>;
                }
              })}
              <Button type="submit" variant="solid">
                Submit
              </Button>
            </VStack>
          </form>
        </VStack>
      </Card>
    </ChakraProvider>
  );
};
