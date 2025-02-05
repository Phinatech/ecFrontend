/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { UseAppDispach } from "../../Global/ReduxState/Store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { deviceData } from "../../Global/ReduxState/State";
import { useMutation } from "@tanstack/react-query";
import { postDevice, GetOneUser } from "../../Api/Api";
import { useAppSelector } from "../../Global/ReduxState/Store";
import { useQuery } from "@tanstack/react-query";

const PostDash = () => {
  const user = useAppSelector((state) => state.currentUser);

  console.log("user", user);

  const fetchUser = useQuery({
    queryKey: ["user"],
    queryFn: () => GetOneUser(user?._id),
  });

  console.log("here", fetchUser);

  const dispatch = UseAppDispach();
  const schema = yup
    .object({
      email: yup.string().required(),
      ticketNumber: yup.string(),
      ticketPosition: yup.string(),
      deviceType: yup.string(),
    })
    .required();

  type formData = yup.InferType<typeof schema>;

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const posting = useMutation({
    mutationKey: ["device"],
    mutationFn: postDevice,

    onSuccess: (myData) => {
      dispatch(deviceData(myData.data));
      console.log("here", myData.data);
    },
  });

  return (
    <>
      <PostInput>
        <Wrapper>
          <Input
            {...register("email")}
            placeholder="post device type"
            type="select"
          />
          <Input
            {...register("ticketNumber")}
            placeholder="post a ticket number"
            type="select"
          />{" "}
          <Input
            {...register("ticketPosition")}
            placeholder="post device positon"
            type="select"
          />
          <ButtonWrapper>
            <Button cursor="value" background_color="value">
              add device
            </Button>

            <Button cursor="value" background_color="">
              cancel
            </Button>
          </ButtonWrapper>
        </Wrapper>
      </PostInput>
    </>
  );
};

export default PostDash;

const Wrapper = styled.form`
  width: 300px;
  padding-bottom: 15px;
  padding-top: 15px;
  background-color: #f0f0f1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

const PostInput = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
  backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  outline: none;
  margin: 9px;
  width: 200px;
  border-radius: 12px;
  background-color: transparent;
  height: 40px;
  padding-left: 20px;
  border: 1px solid rgb(48, 48, 61);
  color: #6b6b6b;
  @media screen and (max-width: 500px) {
    width: 228px;
  }
  ::placeholder {
    font-weight: 400;
    color: rgb(88, 88, 88);
    font-size: 13px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
`;
const Button = styled.div<{ background_color: string; cursor: string }>`
  background-color: ${({ background_color }) =>
    background_color ? "#000000" : "#32323f"};
  border: 0;
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 40px;
  text-transform: capitalize;
  color: white;
  font-weight: 500;
  margin-left: 10px;
  @media screen and (max-width: 500px) {
    width: 250px;
  }
  font-size: 16px;
  cursor: ${({ cursor }) => (cursor ? "pointer" : "not-allowed")};
  transition: all 360ms;
  :hover {
    transform: scale(0.9);
  }
`;

const Container = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #21212b;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;
const Menu = styled.div`
  color: rgb(209, 209, 210);
  font-size: 30px;
  margin-left: 30px;
  cursor: pointer;
`;
const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;
const Add = styled.div`
  border-radius: 9px;
  font-size: 20px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  margin-right: 20px;
  background-color: #eb72bb;
`;
const Search = styled.div`
  margin-right: 20px;
  color: white;
`;
const Profile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-transform: uppercase;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: 1px solid rgb(209, 209, 210);
`;
