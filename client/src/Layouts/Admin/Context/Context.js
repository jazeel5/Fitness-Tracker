import axios from "axios";
import React, { createContext } from "react";
import Swal from "sweetalert2";
import { config } from "../../Config/config";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const AdminContext = createContext();
export default function Context(props) {
  const { host } = config;
  const [admin, setAdmin] = useState(null);
  const [counts, setCounts] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [allWorkOuts, setAllWorkOuts] = useState([]);
  const [singleWorkOut, setSingleWorkOut] = useState(null);
  const [allMeals, setAllMeals] = useState([]);
  const [singleMeal, setSingleMeal] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const confirmation = (
    mainSubTitle,
    confirmButtonLabel,
    cancelMessage,
    successTitle,
    successSubTitle,
    performAction
  ) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: mainSubTitle,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: confirmButtonLabel,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          performAction();
          swalWithBootstrapButtons.fire({
            title: successTitle,
            text: successSubTitle,
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: cancelMessage,
            icon: "error",
          });
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
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateProfilePicture = async (pic) => {
    let token = localStorage.getItem("adminToken");
    const data = new FormData();
    data.append("profile", pic);
    axios
      .put(`${host}/admin/updateProfilePicture`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
        }
        setAdmin(res.data.admin);
        getProfile();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const updateProfile = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateProfile`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          autoCloseAlert(
            res.data.message,
            "Your profile will load here ",
            2000
          );
        }
        setAdmin(res.data.admin);
        getProfile();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getFeedbacks = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getFeedbacks`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setFeedbacks(res.data.feedbacks);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllCustomers = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllCustomers`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setCustomers(res.data.customers);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllWorkOuts = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllWorkOuts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setAllWorkOuts(res.data.workOuts);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getSingleWorkOut = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getSingleWorkOut/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setSingleWorkOut(res.data.workOut);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateWorkOut = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateWorkOut/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          setTimeout(() => {
            navigate("/admin/Workouts");
          }, 2000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
        // setSingleWorkOut(res.data.workOut);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const deleteWorkOut = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .delete(`${host}/admin/deleteWorkOut/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          getAllWorkOuts();
        } else {
          directAlert("error", res.data.message, 2000);
        }
        // setSingleWorkOut(res.data.workOut);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateCustomerStatus = async (id, status) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(
        `${host}/admin/updateCustomerStatus/` + id,
        { status },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          directAlert(res.data.color, res.data.message, 2000);
          setState(!state);
          getAllCustomers();
        }
        // setCustomers(res.data.customers);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const insertNewWorkOut = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertNewWorkOut`, data, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          setTimeout(() => {
            navigate("/admin/Workouts");
          }, 2000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const insertNewMeal = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertNewMeal`, data, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          autoCloseAlert(res.data.message, "All meals will load here ", 2000);
          setTimeout(() => {
            navigate("/admin/Meals");
          }, 2000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllMeals = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllMeals`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setAllMeals(res.data.meals);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getSingleMeal = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getSingleMeal/${id}`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setSingleMeal(res.data.meal);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateMeal = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateMeal/${id}`, data, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          autoCloseAlert(res.data.message, "All meals will load here ", 2000);
          setTimeout(() => {
            navigate("/admin/Meals");
          }, 2000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const deleteMeal = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .delete(`${host}/admin/deleteMeal/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          getAllMeals();
        } else {
          directAlert("error", res.data.message, 2000);
        }
        // setSingleWorkOut(res.data.workOut);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getCounts = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getCounts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setCounts({
            clientCount: res.data.clientCount,
            workOutCount: res.data.workOutCount,
            mealCount: res.data.mealCount,
          });
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("adminToken") != null) {
      getProfile();
    } else {
      setAdmin(null);
      navigate("/admin/");
    }
  }, [state]);

  const LoginAdmin = (data) => {
    axios
      .post(`${host}/admin/Login`, data)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data);
          localStorage.setItem("adminToken", res.data.token);
          setState(!state);
          autoCloseAlert(
            res.data.message,
            "You will redirected to the dashboard ",
            2000
          );
          setTimeout(() => {
            navigate("/admin/Dashboard");
          }, 1000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <AdminContext.Provider
      value={{
        LoginAdmin,
        admin,
        setAdmin,
        pathname,
        getProfile,
        confirmation,
        navigate,
        state,
        setState,
        getFeedbacks,
        feedbacks,
        getAllCustomers,
        customers,
        updateCustomerStatus,
        updateProfilePicture,
        host,
        updateProfile,
        loading,
        setLoading,
        insertNewWorkOut,
        allWorkOuts,
        getAllWorkOuts,
        singleWorkOut,
        setSingleWorkOut,
        getSingleWorkOut,
        updateWorkOut,
        deleteWorkOut,
        insertNewMeal,
        getAllMeals,
        allMeals,
        getSingleMeal,
        singleMeal,
        updateMeal,
        deleteMeal,
        getCounts,
        counts,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}
