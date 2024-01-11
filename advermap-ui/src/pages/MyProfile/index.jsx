import React from "react";
import DataTable from "../../components/DataTable";
import { useState, useEffect } from "react";
import { SpaceService } from "services/space/SpaceService";
import { Link } from "react-router-dom";
import { PAGE } from "components/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/appSlice";
import { useNavigate } from "react-router-dom";
import { formatFormat, formatImgUrl, plannedFormat, typeFormat } from "utils/format";
import Heading1 from "components/Text/Heading1";
import ChakraHook from "hooks";
import { Card, CardBody, CardHeader, Flex, HStack, Heading } from "@chakra-ui/react";
import AccountDetailForm from "./AccountDetailForm";

const MyProfilePage = () => {

  return (
    <ChakraHook>
        <HStack spacing={4} paddingX={4} paddingY={6} alignItems="flex-start">
            <Card width={'full'}>
                <CardHeader borderBottom={'1px'} borderColor={'gray.300'}>
                <Flex justifyContent={'space-between'}>
                    <Heading size="md">Thông tin cá nhân</Heading>
                </Flex>
                </CardHeader>

                <CardBody>
                    <AccountDetailForm/>
                </CardBody>
            </Card>
        </HStack>
    </ChakraHook>
  );
};

export default MyProfilePage;
