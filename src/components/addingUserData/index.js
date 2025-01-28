import {Component} from "react";

import "./index.css";

class AddUserData extends Component {
    
    state={firstName:"",lastName:"",email:"",department:""}

    addName=(e)=>{
        this.setState({firstName:e.target.value})
    }
    
    addLast=(e)=>{
        this.setState({lastName:e.target.value})
    }
    
    addEmail=(e)=>{
        this.setState({email:e.target.value})
    }
    
    addDepartment=(e)=>{
        this.setState({department:e.target.value})
    }
    
    addUserData=async(e)=>{
        e.preventDefault()
        const {firstName,lastName,email,department} = this.state
        const api="https://usermanagementbackend-m0to.onrender.com/users"
        const data={
            firstName:firstName,
            lastName:lastName,
            email:email,
            department:department
        }
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json"
            },
            body:JSON.stringify(data)
        }

        try{
            const response = await fetch(api,options)
            const result = await response.json()
            if(response.ok){
                alert("User added successfully!")
                this.setState({firstName:"",lastName:"",email:"",department:""})
            }else{
                alert("Failed to add user. Error: "+result.message)
            }
        }catch(error){
            alert("Failed to add user. Error: "+error.message)
        }

    }
    render(){
        const{firstName,lastName,email,department} = this.state
        return(

            <div>
                <h1>Add User</h1>
                <form onSubmit={this.addUserData}>
                <input type="text" placeholder="First Name" onChange={this.addName} value={firstName} required/>
                <br/><input type="text" placeholder="Last Name" onChange={this.addLast} value={lastName} required/>
                <br/><input type="email" placeholder="Email" onChange={this.addEmail} value={email} required/>
                <br/><input type="text" placeholder="department" onChange={ this.addDepartment} value={department} required/>
                <br/><button type="submit" className="addUserButton">Add User</button>
                </form>
            </div>
        )
    }
}

export default AddUserData;

