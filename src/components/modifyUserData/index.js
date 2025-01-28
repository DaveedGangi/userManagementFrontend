import {Component} from "react";

import "./index.css";

class EditDeleteUserData extends Component{

    state={userId:null,editCondition:false,specificUserData:[],firstName:null,lastName:null,department:null,email:null}
    
    componentDidMount(){
        
        this.setState({userId: this.props.match.params.id},()=>{this.fetchSpecificUserData()});
        
    }

    // Method to fetch specific user data
    fetchSpecificUserData = async() => {
        const{userId} = this.state;
     
        const fetchApi= `https://usermanagementbackend-m0to.onrender.com/users`;
        const api= await fetch(fetchApi);
        const response= await api.json();
        const filterData=response.filter((each)=>each.id===parseInt(userId));
        
        this.setState({specificUserData:filterData[0],firstName:filterData[0].firstName,lastName:filterData[0].lastName,email:filterData[0].email,department:filterData[0].department});
     


    }
    
    // Method to delete user data
    deleteUserData = async() => {
        const{userId} = this.state;
            const deleteApi= `https://usermanagementbackend-m0to.onrender.com/users/${userId}`;
            const options={
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const api= await fetch(deleteApi,options);
            const response= await api.json();
           
            if(response){
                this.props.history.push('/');
            }
            alert(response.message);

    }
       
    editUserData=()=>{
        const{editCondition}=this.state;
        this.setState({editCondition:!editCondition});
    }

    changeFirstName=(e)=>this.setState({firstName:e.target.value});
    changeLastName=(e)=>this.setState({lastName:e.target.value});
    changeDepartment=(e)=>this.setState({department:e.target.value});
    changeEmail=(e)=>this.setState({email:e.target.value});

    editedDetailsSubmit=async(e)=>{
        e.preventDefault();

        const {firstName,lastName,department,email,userId} = this.state;
        const updateApi= `https://usermanagementbackend-m0to.onrender.com/users/${userId}`;
        const options={
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({firstName,lastName,email,department})
        }
        const api= await fetch(updateApi,options);
        const response= await api.json();
        
        if(response){
            this.setState({editCondition:false});
            this.fetchSpecificUserData();
        }
        alert(response.message);
    }

    render(){
        const{editCondition,specificUserData,firstName,lastName,department,email} = this.state;
        
        
        return(

            <div>
                <br/>
                <button className="deleteButton" onClick={this.deleteUserData}>Delete</button>
                <button className="editButton" onClick={this.editUserData}>Edit</button>
                <br/>
                {
                    editCondition?<div>
                    <form onSubmit={this.editedDetailsSubmit}>
                        <input type="text" value={firstName} onChange={this.changeFirstName} required/>
                        <br/><input type="text" value={lastName} onChange={this.changeLastName} required/>
                        <br/><input type="text" value={department} onChange={this.changeDepartment} required/>
                        <br/><input type="text" value={email} onChange={this.changeEmail} required/>
                        <br/><br/>
                        <button className="submitButton" type="submit">Submit</button>
                        
                    </form>
                    </div>:
                

                <div>
                    <h3>User Name: {specificUserData.firstName}</h3>
                    <h3>User Email: {specificUserData.email}</h3>
                    <h3>User Id: {specificUserData.id}</h3>
                    <h3>User Department: {specificUserData.department}</h3>
                </div>

                 }
              
            </div>
        )
    }
}

export default EditDeleteUserData;