import React from 'react'
import { useState, useEffect } from 'react';
import Field from '../Form/Field';
import axios from 'axios';
import custumerAPI from '../services/custumerAPI';
import {Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_Customers } from '../config';
import { CommonLoading } from 'react-loadingg';

const CostumerPage=({match,history})=>{

const [costumer, setCostumer]= useState({firstName:"",lastName:"",email:"",company:""});
const [loading, setLoading] = useState(false);

const { id = "new" } = match.params;
useEffect(() => {
    if (id != "new")
    {    
        setLoading(true)
        consumerget(id);
    }
    
    },[id]);

const handleChange =(event) => {

    const value  = event.target.value;
    const name = event.target.name;

    setCostumer({...costumer,[name]:value});
}

const handleSubmit= async (event) => {
    event.preventDefault();
    //Authentificaton();
    setLoading(true)
    if (id != "new")
    {
       
        try {
            const result= await custumerAPI.custumerPut(costumer,id);
            setLoading(false)
            toast.success("you have update the selected customer ");
            history.push('/costomers/'+id)
        } catch (error) {
            toast.error("it is impossible to update the selected customer");
            setLoading(false);
        }

    }
    else 
    {
        try {
            const result= await custumerAPI.custumerPost(costumer);
            setLoading(false)
            toast.success("you have add a new customer ");
            history.replace('/costumers')
        } catch (error) {
            setLoading(false)
            toast.error("it is not possible to add a customer");
        }

    }

}

const consumerget=async (id)=>
{  
    try {
        await axios.get(API_Customers+'/'+id)
        .then(res => { 
            const editCustumer={firstName:res.data.firstName,lastName:res.data.lastName,email:res.data.email,company:res.data.company};
            setLoading(false)
            setCostumer(editCustumer);
           
        })
    } catch (error) {
        toast.error("customer doen't exist");
    }

}

return (
<>
{id != "new" &&
<div className="mb-3 d-flex justify-content-between align-items-center">
    <h1> Update a customer</h1>
</div>
|| <div className="mb-3 d-flex justify-content-between align-items-center">
    <h1> Add a customer</h1>
</div>}
<form onSubmit={handleSubmit} >

        <Field  type="text"  placeholder="customer familly name" handleChange={handleChange} value = {costumer.firstName} name="firstName"/>
        <Field  type="text"  placeholder="customer name" handleChange={handleChange} value ={costumer.lastName} name="lastName"/>
        <Field  type="email" placeholder="customer email" handleChange={handleChange} value ={costumer.email} name="email" />
        <Field  type="text"  placeholder="customer company" handleChange={handleChange} value ={costumer.company} name="company" />
        <div>
                 <button className="btn btn-primary" type="submit" value="Submit"> Save </button>
                 <Link to="/costumers" className="btn btn-link">
                 return to the list of customers </Link>
        </div>

</form>
{loading && <CommonLoading />}

</>


)


}

export  default CostumerPage;