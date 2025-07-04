import "./Profile.css";
import DataContext from "../../context/DataContext";
import { useEffect, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { Cookies } from 'react-cookie';
import axios from "axios";

const Profile = () => {

    const dataContext = useContext(DataContext);
    const cookies = new Cookies();
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = cookies.get("token");
        const decoded = jwtDecode(token);
        // console.log("Decoded:", decoded);

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/getById/${decoded.id}`)
        .then((res) => {
            setUser(res.data);
            console.log("User:", res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div className="profile-container">
            <p className="profile-title">Profile</p>
            <div className="profile-content">
                <div className="profile-info">
                    <p>Name</p>
                    <p>{user.name}</p>
                </div>
                <div className="profile-info">
                    <p>About</p>
                    <p>this is a description about me in short</p>
                </div>
                <div className="profile-info">
                    <p>Email</p>
                    <p>{user.email}</p>
                </div>
                <div className="profile-info">
                    <p>Role</p>
                    <p>{user.role}</p>
                </div>
                <div className="profile-info">
                    <p>Team</p>
                    <p>Team A</p>
                </div>
                <div className="profile-info">
                    <p>Projects Worked</p>
                    {/* Add a list of projects worked by the user */}
                    <ul>
                        <li>Project 1</li>
                        <li>Project 2</li>
                        <li>Project 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;