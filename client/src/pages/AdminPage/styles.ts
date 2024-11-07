import styled from "styled-components";

export const LoginContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  input {
    margin: 10px;
    padding: 10px;
    width: 200px;
  }
  button {
    padding: 10px 20px;
  }
`;

export const AdminContainer = styled.div`
  padding: 20px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  input,
  textarea {
    margin: 5px 0;
    padding: 10px;
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
  }
`;

export const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #0077b5;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;
