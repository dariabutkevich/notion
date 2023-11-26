import React, { useState, useContext } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { User, saveUserData, generateUserId } from "../util/validation";
import { UserContext } from "../components/UserContextProvider";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [errors, setErrors] = useState(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function handleSignUp() {
    try {
      const user = User.parse({
        email,
        password,
      });
      const generatedUserId = generateUserId();

      const userData = {
        email: user.email,
        password: user.password,
        userId: generateUserId,
        createdAt: new Date().toISOString(),
      };

      setUserId(generatedUserId);
      console.log(userData);
      setErrors(null);
      saveUserData(userData)
        .then(() => {
          userContext.onChange(userData);
          setCreatedAt(userData.createdAt);
          navigate("/");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  }

  const fillFields = email && password && repeatPassword;
  const passwordVerification = password === repeatPassword;

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="mt-24 font-bold text-3xl">Sign Up</h1>
      <input
        className=" py-2 px-4 bg-gray-100  hover:bg-gray-200"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors?.email && (
        <div className="text-red-400">{errors?.email._errors}</div>
      )}
      <input
        className=" py-2 px-4 bg-gray-100  hover:bg-gray-200"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors?.password && (
        <div className="text-red-400">{errors?.password._errors}</div>
      )}
      <input
        className=" py-2 px-4 bg-gray-100 hover:bg-gray-200"
        placeholder="Repeat Password"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      {!passwordVerification && (
        <div className="text-red-400">Passwords don't match</div>
      )}
      {passwordVerification && fillFields ? (
        <button
          onClick={handleSignUp}
          className=" py-2 px-4 mb-8  bg-gray-300  hover:bg-gray-400 text-black"
        >
          Sign Up
        </button>
      ) : (
        <button disabled className=" py-2 px-4 mb-8  bg-gray-300">
          Sign Up
        </button>
      )}
    </div>
  );
}

export default SignUp;
