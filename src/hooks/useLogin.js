import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/actions";
import Swal from "sweetalert2";

function useLogin(initialForm, validateForm) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const [errorRegister, setErrorRegister ] = useState(null)
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setForm({
      ...form,
      [name]: value,
    });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
     setErrors(validateForm(form));
     console.log(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      dispatch(login(form, setLoading,setResponse))
      Swal.fire({
              
        text: 'Welcome!',
        icon: 'success',
        timer: 2000
      })
    }
   
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
     setErrors(validateForm(form));
     console.log(errors);
    if (Object.keys(errors).length === 0) {
      console.log(form)
      setLoading(true);
      dispatch(register(form, setLoading,setResponse,setErrorRegister))
      Swal.fire({
              
        text: 'Registered was successful',
        icon: 'success',
        timer: 2000
      })
    }
   
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };


  return {
    form,
    handleBlur,
    handleChange,
    handleSubmit,
    loading,
    response,
    errors,
    handleSubmitRegister,errorRegister
  };
}


export default useLogin;