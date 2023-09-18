import React, {useState} from 'react';
import './App.css';
import StudentForm from "./components/StudentForm";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";

function App() {

    const [showRegistrationForm, setShowRegistrationForm] = useState(true);
    const [showStudentList, setShowStudentList] = useState(false);

    const toggleRegistrationForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
        setShowStudentList(!showStudentList);
    };

    const toggleStudentList = () => {
      setShowStudentList(!showStudentList);
        setShowRegistrationForm(!showRegistrationForm);
    };

    return (
        <>
            <Navbar onRegisterClick={toggleRegistrationForm} onStudentListClick={toggleStudentList}/>
            {showRegistrationForm && <StudentForm/>}
            {showStudentList && <StudentList/>}
        </>
    );
}

export default App;
