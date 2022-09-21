import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

function Onboarding() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [signature, setSignature] = useState(null);

  const [formData, setFormData] = useState({
    basicDetails: {
      fathers_name_or_husbands_name: "",
      maritalstatus: "",
      name: "",
      gender: "",
      dob: "",
      pf_number: "",
      address: "",
    },
    nomineeDetails: [
      {
        name_and_address_of_nominee: "",
        nominee_relationship: "",
        dob: "",
        totalamt_or_share: "",
        if_nominee_is_a_minor_mention_guardian_name_and_address: "",
      },
    ],
    epsNomineeDetails: [
      {
        name_address_of_the_family_member: "",
        epsdob: "",
        relationship_with_member: "",
      },
    ],
    epsNonFamDetails: [
      {
        name_and_address_of_nominee_eps: "",
        dobepsnominee: "",
        relation: "",
      },
    ],
  });

  // const [formData2, setFormData2] = useState([{ name: "", age: " " }]);
  const handleNomineeAdd = () => {
    setFormData((prevState) => ({
      ...prevState,
      nomineeDetails: [...prevState.nomineeDetails, { name: "", age: "" }],
    }));
  };

  const handleEpsNomineeAdd = () => {
    setFormData((prevState) => ({
      ...prevState,
      epsNomineeDetails: [
        ...prevState.epsNomineeDetails,
        { name: "", age: "" },
      ],
    }));
  };

  const handleEpsNonFamNomineeAdd = () => {
    setFormData((prevState) => ({
      ...prevState,
      epsNonFamDetails: [...prevState.epsNonFamDetails, { name: "", age: "" }],
    }));
  };

  const handleNomineeChange = (index, field, e) => {
    let tempNominee = formData.nomineeDetails;
    tempNominee[index] = { ...tempNominee[index], [field]: e.target.value };
    setFormData((prevState) => ({
      ...prevState,
      nomineeDetails: tempNominee,
    }));
  };

  const handleEpsNomineeChange = (index, field, e) => {
    let tempNominee = formData.epsNomineeDetails;
    tempNominee[index] = { ...tempNominee[index], [field]: e.target.value };
    setFormData((prevState) => ({
      ...prevState,
      epsNomineeDetails: tempNominee,
    }));
  };

  const handleEpsNonFamNomineeChange = (index, field, e) => {
    let tempNominee = formData.epsNonFamDetails;
    tempNominee[index] = { ...tempNominee[index], [field]: e.target.value };
    setFormData((prevState) => ({
      ...prevState,
      epsNonFamDetails: tempNominee,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("file", signature);
      form.append("data", JSON.stringify(formData));

      // form.append("name", basicDetails.name);

      // form.append(
      //   "fathers_name_or_husbands_name",
      //   basicDetails.fathers_name_or_husbands_name
      // );

      // form.append("gender", basicDetails.gender);

      // form.append("dob", basicDetails.dob);

      // form.append("maritalstatus", basicDetails.maritalstatus);

      // form.append("pf_number", basicDetails.pf_number);

      // form.append("address", basicDetails.address);

      // form.append("epfNom", nomineeDetails);

      // form.append("epsMem", epsNomineeDetails);

      // form.append("epsNom", epsNonFamDetails);
      const config = {
        headers: {
          "Content-Type": `multipart/form-data`,
          access_token: user.jwtToken,
        },
      };
      console.log(form);
      const {
        data: { success, error, data },
      } = await axios.post("/api/auth/uploadSignedDocuments", form, config);
      if (success) {
        toast({
          title: "Success",
          description: "Details uploaded successfully",
          status: "success",
        });
      } else {
        toast({
          title: "Error",
          description: error,
          status: "error",
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.error
          ? error.response.data.error
          : "Something went wrong.Please try again.",
        status: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Box mx="auto" maxWidth="1000px">
      <form onSubmit={submit}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontSize={28}>
                  Basic Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} margin={"2"}>
              <FormControl paddingBottom={"5"}>
                <FormLabel>Name</FormLabel>
                <Input
                  required
                  value={formData.basicDetails.name}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        name: e.target.value,
                      },
                    }))
                  }
                  marginBottom={"5"}
                  type="text"
                />
                <FormLabel>Father's/Husband's name</FormLabel>
                <Input
                  required
                  value={formData.basicDetails.fathers_name_or_husbands_name}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        fathers_name_or_husbands_name: e.target.value,
                      },
                    }))
                  }
                  marginBottom={"5"}
                  type="text"
                />
                <FormLabel>Date of Birth</FormLabel>

                <Input
                  required
                  value={formData.basicDetails.dob}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        dob: e.target.value,
                      },
                    }))
                  }
                  marginBottom={"5"}
                  type="date"
                />

                <FormLabel>Sex</FormLabel>
                <Input
                  required
                  value={formData.basicDetails.gender}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        gender: e.target.value,
                      },
                    }))
                  }
                  marginBottom={"5"}
                  type="text"
                />
                <FormLabel>Marital Status</FormLabel>
                <Input
                  required
                  value={formData.basicDetails.maritalstatus}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        maritalstatus: e.target.value,
                      },
                    }))
                  }
                  marginBottom={"5"}
                  type="text"
                />
                <FormLabel>Account No.(PF/EPS Number)</FormLabel>
                <Input
                  required
                  value={formData.basicDetails.pf_number}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        pf_number: e.target.value,
                      },
                    }))
                  }
                  marginBottom={"5"}
                  type="text"
                />
                <FormLabel>Address(Residential)</FormLabel>
                <Input
                  required
                  value={formData.basicDetails.address}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      basicDetails: {
                        ...prevState.basicDetails,
                        address: e.target.value,
                      },
                    }))
                  }
                  marginBottom={"5"}
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Signature</FormLabel>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setSignature(e.target.files[0])}
                  accept="image/png, image/jpeg"
                />
              </FormControl>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontSize={28}>
                  FORM 2
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} margin={"2"}>
              <Text fontSize={28}>EPF</Text>
              {formData.nomineeDetails.map((nominee, index) => (
                <Box mt={6}>
                  <FormLabel marginBottom={"5"}>Nominee {index + 1}</FormLabel>
                  <FormControl mt={2} marginBottom={"5"}>
                    <FormLabel>Name and Address of the nominee</FormLabel>
                    <Input
                      value={nominee.name_and_address_of_nominee}
                      onChange={(e) =>
                        handleNomineeChange(
                          index,
                          "name_and_address_of_nominee",
                          e
                        )
                      }
                      marginBottom={"5"}
                      type="text"
                    ></Input>
                    <FormLabel>
                      Nominee's relationship with the member
                    </FormLabel>
                    <Input
                      value={nominee.nominee_relationship}
                      onChange={(e) =>
                        handleNomineeChange(index, "nominee_relationship", e)
                      }
                      marginBottom={"5"}
                      type="text"
                    ></Input>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      value={nominee.dob}
                      onChange={(e) => handleNomineeChange(index, "dob", e)}
                      marginBottom={"5"}
                      type="date"
                    ></Input>
                    <FormLabel>
                      Total amount or share of accumulations in Provident Fund
                      to be paid to each nominee (%)
                    </FormLabel>
                    <Input
                      value={nominee.totalamt_or_share}
                      onChange={(e) =>
                        handleNomineeChange(index, "totalamt_or_share", e)
                      }
                      marginBottom={"5"}
                      type="text"
                    ></Input>
                    <FormLabel>
                      If the nominee is a minor, name and relationship and
                      address of the guardian who may receive the amount during
                      the minority of nominee
                    </FormLabel>
                    <Input
                      value={
                        nominee.if_nominee_is_a_minor_mention_guardian_name_and_address
                      }
                      onChange={(e) =>
                        handleNomineeChange(
                          index,
                          "if_nominee_is_a_minor_mention_guardian_name_and_address",
                          e
                        )
                      }
                      marginBottom={"5"}
                      type="text"
                    ></Input>
                  </FormControl>
                </Box>
              ))}

              <Button
                onClick={handleNomineeAdd}
                colorScheme="blue"
                size="sm"
                marginBottom={"5"}
              >
                Add Nominee
              </Button>
              <Text fontSize={28}>EPS-FAMILY MEMBERS</Text>
              {formData.epsNomineeDetails.map((nominee, index) => (
                <Box mt={6}>
                  <FormLabel marginBottom={"5"}>Nominee {index + 1}</FormLabel>
                  <FormControl mt={2} marginBottom={"5"}>
                    <FormLabel>
                      Name and Address of the family members
                    </FormLabel>
                    <Input
                      value={nominee.name_address_of_the_family_member}
                      onChange={(e) =>
                        handleEpsNomineeChange(
                          index,
                          "name_address_of_the_family_member",
                          e
                        )
                      }
                      marginBottom={"5"}
                      type="text"
                    ></Input>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      value={nominee.epsdob}
                      onChange={(e) =>
                        handleEpsNomineeChange(index, "epsdob", e)
                      }
                      marginBottom={"5"}
                      type="date"
                    ></Input>
                    <FormLabel>Relationship with the member</FormLabel>
                    <Input
                      value={nominee.relationship_with_member}
                      onChange={(e) =>
                        handleEpsNomineeChange(
                          index,
                          "relationship_with_member",
                          e
                        )
                      }
                      marginBottom={"5"}
                      type="text"
                    ></Input>
                  </FormControl>
                </Box>
              ))}
              <Button
                onClick={handleEpsNomineeAdd}
                colorScheme="blue"
                size="sm"
                marginBottom={"5"}
              >
                Add Nominee
              </Button>
              <Text fontSize={28}>EPS-NON FAMILY MEMBERS</Text>
              {formData.epsNonFamDetails.map((nominee, index) => (
                <Box mt={6}>
                  <FormLabel marginBottom={"5"}>Nominee {index + 1}</FormLabel>
                  <FormControl mt={2} marginBottom={"5"}>
                    <FormLabel>Name and Address of the Nominee</FormLabel>
                    <Input
                      value={nominee.name_and_address_of_nominee_eps}
                      onChange={(e) =>
                        handleEpsNonFamNomineeChange(
                          index,
                          "name_and_address_of_nominee_eps",
                          e
                        )
                      }
                      marginBottom={"5"}
                      type="text"
                    ></Input>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      value={nominee.dobepsnominee}
                      onChange={(e) =>
                        handleEpsNonFamNomineeChange(index, "dobepsnominee", e)
                      }
                      marginBottom={"5"}
                      type="date"
                    ></Input>
                    <FormLabel>Relationship with the member</FormLabel>
                    <Input
                      value={nominee.relation}
                      onChange={(e) =>
                        handleEpsNonFamNomineeChange(index, "relation", e)
                      }
                      marginBottom={"5"}
                      type="text"
                    ></Input>
                  </FormControl>
                </Box>
              ))}
              <Button
                onClick={handleEpsNonFamNomineeAdd}
                colorScheme="blue"
                size="sm"
              >
                Add Nominee
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Button
          isLoading={loading}
          colorScheme="blue"
          type="submit"
          marginY={6}
          marginLeft={4}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Onboarding;
