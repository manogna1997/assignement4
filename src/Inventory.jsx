import React, { Component, useState, useEffect } from 'react';
import InvRow from './inventory/InvRow.jsx'
import Product from './inventory/Pojo.jsx'
import AddProduct from './inventory/AddProduct.jsx'
import { useQuery, gql, useMutation } from '@apollo/client';


const GET_PRODUCT = gql` {
products {
    id, name,price,image , category
}}`;

const ADD_PRODUCT = gql`
    mutation CreateProd($n : String! , $p: Float ,$i: String, $c : Category!){
    createProd(name: $n ,price : $p ,image: $i ,category: $c ){
        category
    }}`;

export default function Inventory2(props) {

    const [prod, setProd] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [addProduct] = useMutation(ADD_PRODUCT);
    const { loading, error, data , refetch, networkStatus} = useQuery(GET_PRODUCT,   { notifyOnNetworkStatusChange: true });

    function saveProduct(p) {
        // console.log(JSON.stringify(p))
        console.log(addProduct({ variables: { n: p.name, p: Number.parseFloat(p.price), i: p.image, c: p.category } }));
        if (refresh == false) {
            setRefresh(true)
        } else {
            setRefresh(false)
        }
        refetch()
    };




    if (loading) {
        return <div>Loading still ....</div>
    } else {
        console.log("loading "+prod)
        return (<div>

            <div>
                <h2>My Company Inventory {data.products.lenght}</h2>
            </div>
            <div>
                <h3>Showing all available products</h3>
            </div>
            <hr />
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((p, i) => { return <InvRow key={i} keyId={i} data={p} /> })}
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    <h3>Add a new product to inventory</h3>
                </div>
                <hr />
                <div >
                    <AddProduct saveProd={saveProduct} />
                </div>
            </div>
        </div>
    
        );
   
    }
}

