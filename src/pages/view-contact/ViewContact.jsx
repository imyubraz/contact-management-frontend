import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Layout from './../../layouts/Layout';

const ViewContact = () => {
    const {id} = useParams();
    // console.log(id);

    const [contact, setContact] = useState({});

    useEffect(()=>{
        // To get all contacts : GET request on /contact endpoint
        const baseURL = `http://localhost:4444`;
        const endPoint = `contact`;
        const URL = `${baseURL}/${endPoint}/${id}`;

        try {
            axios.get(URL)
            .then(res=>{
                // console.log(res);
                // console.log(res.data);
                console.log(res.data.data); // This is contact data object.
                setContact(res.data.data);
            })
            .catch(err=>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

  return (
    <>
    <Layout>
        <div className="container flex justify-center px-2 py-8">
            <div className="card row border rounded-lg shadow-md hover:shadow-lg pb-4 space-y-4">
                <div className="row border-b-2">
                    <div>
                        <img src={contact.image} alt="" className='max-h-[20rem] mx-auto'/>
                    </div>
                    <div className='py-2'>
                        <p className='text-center capitalize text-xl font-semibold'>{contact.name}</p>
                    </div>
                </div>
                <div className="row space-y-4 px-4 text-lg">
                    <div className="row flex gap-4">
                        <div className="col icon">📧</div>
                        <div className="col"><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
                    </div>
                    <div className="row flex gap-4">
                        <div className="col icon">📞</div>
                        <div className="col"><a href={`tel:${contact.phone}`}>{contact.phone}</a></div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    </>
  )
}

export default ViewContact