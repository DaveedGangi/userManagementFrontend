import {Component} from "react";

import {Link} from "react-router-dom";

import "./index.css";

class Home extends Component{

    state={collectionOfUsers:[]}

    componentDidMount(){
        this.fetchIntialUserData();
    }

    fetchIntialUserData = async () => {
        try {
            const response = await fetch('https://usermanagementbackend-m0to.onrender.com/users');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            
            const data = await response.json();
            console.log(data);

            this.setState({collectionOfUsers: data});
        } catch (error) {
            console.error("Error fetching users:", error);
        }

    }

    render(){
        const {collectionOfUsers} = this.state;
        return (
            <div className="HomeStyle">
                <h1>Welcome to the Home Page!</h1>
                <h1>User Management App</h1>
              <Link to="/add">
                 <button className="addUserDataButton" type="button">Add User Data </button>
             </Link>
                <p>This is the default home page. You can navigate to other pages using the links below.</p>
            
            <div>
                <h2>List of Users</h2>
                <ol>
                    {collectionOfUsers.map((user, index) => (
                        <li key={index}>
                            <Link to={`/user/${user.id}`}>
                                <h3>{user.firstName} {user.lastName}</h3>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
            
            
            
            
            
            
            
            
            
            
            </div>
        );
    }
}

export default Home;