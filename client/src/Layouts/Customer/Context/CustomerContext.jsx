import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../../Config/config";

export const CstContext = createContext();

export default function CustomerContext(props) {
  const { host } = config;
  const [customer, setCustomer] = useState(null);
  const [gender, setGender] = useState(null);
  const [state, setState] = useState(false);
  const [heightData, setHeightData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  //workOuts
  const [allWorkOuts, setAllWorkOuts] = useState([]);
  const [singleWorkOut, setSingleWorkOut] = useState(null);

  const [isWorkoutSaved, setIsWorkoutSaved] = useState(false);
  const [savedSingleWorkout, setSavedSingleWorkout] = useState(null);
  //meals
  const [allMeals, setAllMeals] = useState([]);
  const [singleMeal, setSingleMeal] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savedSingleMeal, setSavedSingleMeal] = useState(null);

  //get saved
  const [savedWorkOuts, setSavedWorkOuts] = useState([]);
  const [savedMeals, setSavedMeals] = useState([]);

  let navigate = useNavigate();
  const { pathname } = useLocation();

  const autoCloseAlert = (msgTitle, msgHtml, msgTimer) => {
    let timerInterval;
    Swal.fire({
      title: msgTitle,
      html: msgHtml + " in <b></b> milliseconds.",
      timer: msgTimer,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log("I was closed by the timer");
      }
    });
  };

  const directAlert = (type, message, time) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  };

  const getProfile = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setCustomer(res.data.customer);
        setGender(res.data.customer.gender);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const sendFeedback = (formData) => {
    axios
      .post(`${host}/customer/sendFeedback`, formData)
      .then((res) => {
        // console.log(res.data);
        directAlert("success", res.data.message, 2000);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("customerToken") != null) {
      getProfile();
    } else {
      if (pathname == "/" || pathname == "/Contact" || pathname == "/About") {
        setCustomer(null);
      } else {
        setCustomer(null);
        navigate("/");
      }
    }
  }, [state]);

  const RegisterCustomer = async (customerInfo) => {
    const data = new FormData();
    data.append("name", customerInfo.name);
    data.append("email", customerInfo.email);
    data.append("password", customerInfo.password);
    data.append("phone", customerInfo.phone);
    data.append("profile", customerInfo.profile);
    data.append("gender", customerInfo.gender);
    data.append("age", customerInfo.age);
    axios
      .post(`${host}/customer/register`, data)
      .then((res) => {
        if (res.data.success) {
          autoCloseAlert(
            res.data.message,
            "You will be redirected to login page",
            3000
          );
          setTimeout(() => {
            navigate("/Login");
          }, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateProfile = async (customerInfo) => {
    // console.log(customerInfo);
    let token = localStorage.getItem("customerToken");
    axios
      .put(`${host}/customer/updateProfile`, customerInfo, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          autoCloseAlert(
            res.data.message,
            "Your profile will load here ",
            3000
          );
          setTimeout(() => {
            setState(!state);
          }, 1000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const LoginCustomer = (data) => {
    axios
      .post(`${host}/customer/Login`, data)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          localStorage.setItem("customerToken", res.data.token);
          setState(!state);
          directAlert("success", res.data.message, 3000);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const uploadCustomerHeightRecord = async (data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(`${host}/customer/uploadCustomerHeightRecord`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // alert(res.data.message);
        if (res.data.success) {
          console.log(res.data);
          setState(!state);
          directAlert("success", res.data.message, 3000);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const deleteCustomerHeightRecord = async (month) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(
        `${host}/customer/deleteCustomerHeightRecord`,
        { month },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        // alert(res.data.message);
        if (res.data.success) {
          console.log(res.data);
          setState(!state);
          directAlert("success", res.data.message, 3000);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getCustomerHeightRecord = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/getCustomerHeightRecord`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setHeightData(res.data.heightRecords);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const uploadCustomerWeightRecord = async (data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(`${host}/customer/uploadCustomerWeightRecord`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          setState(!state);
          directAlert("success", res.data.message, 3000);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteCustomerWeightRecord = async (date) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(
        `${host}/customer/deleteCustomerWeightRecord`,
        { date },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        // alert(res.data.message);
        if (res.data.success) {
          // console.log(res.data);
          setState(!state);
          directAlert("success", res.data.message, 3000);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getCustomerWeightRecord = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/getCustomerWeightRecord`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setWeightData(res.data.weightRecords);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const viewAllMeals = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/viewAllMeals`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data.meals);
        setAllMeals(res.data.meals);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const viewSingleMeal = async (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/viewSingleMeal/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setSingleMeal(res.data.meal);
        if (res.data.saved) {
          // setState(!state);
          setIsSaved(res.data.saved);
          setSavedSingleMeal(...res.data.savedMeal);
        } else {
          setIsSaved(false);
          setSavedSingleMeal(null);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const saveMeal = async (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .post(
        `${host}/customer/saveMeal`,
        { meal_id: id },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        setState(!state);
        console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
        } else {
          directAlert("info", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const removeMealFromSave = async (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .delete(`${host}/customer/removeMealFromSave/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setState(!state);
        setIsSaved(!isSaved);
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
        } else {
          directAlert("info", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const viewAllWorkouts = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/viewAllWorkOuts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setAllWorkOuts(res.data.workOuts);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const viewSingleWorkOut = async (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/viewSingleWorkOut/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setSingleWorkOut(res.data.workOut);
        if (res.data.saved) {
          setIsWorkoutSaved(res.data.saved);
          setSavedSingleWorkout(...res.data.savedWorkOut);
        } else {
          setIsWorkoutSaved(false);
          setSavedSingleWorkout(null);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const saveWorkout = async (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .post(
        `${host}/customer/saveWorkout`,
        { workOut_id: id },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        setState(!state);
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
        } else {
          directAlert("info", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const removeWorkoutFromSave = async (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .delete(`${host}/customer/removeWorkoutFromSave/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setState(!state);
        setIsWorkoutSaved(!isWorkoutSaved);
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
        } else {
          directAlert("info", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getSavedWorkOutAndMeal = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/getSavedWorkOutAndMeal`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setSavedWorkOuts(res.data.savedWorkout);
          setSavedMeals(res.data.savedMeal);
        } else {
          setSavedWorkOuts([]);
          setSavedMeals([]);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <CstContext.Provider
      value={{
        customer,
        setCustomer,
        gender,
        setGender,
        state,
        setState,
        navigate,
        getProfile,
        sendFeedback,
        RegisterCustomer,
        LoginCustomer,
        directAlert,
        updateProfile,
        getCustomerHeightRecord,
        heightData,
        weightData,
        uploadCustomerHeightRecord,
        deleteCustomerHeightRecord,
        uploadCustomerWeightRecord,
        getCustomerWeightRecord,
        deleteCustomerWeightRecord,
        viewAllMeals,
        allMeals,
        viewSingleMeal,
        singleMeal,
        host,
        saveMeal,
        isSaved,
        savedSingleMeal,
        removeMealFromSave,
        viewAllWorkouts,
        viewSingleWorkOut,
        singleWorkOut,
        saveWorkout,
        isWorkoutSaved,
        savedSingleWorkout,
        removeWorkoutFromSave,
        allWorkOuts,
        getSavedWorkOutAndMeal,
        savedWorkOuts,
        savedMeals,
      }}
    >
      {props.children}
    </CstContext.Provider>
  );
}
