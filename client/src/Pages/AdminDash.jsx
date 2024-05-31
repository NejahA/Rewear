import React from 'react'
import {
    fetchUtils,
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
  } from "react-admin";
  // import { dataProvider } from './dataProvider';
  import simpleRestProvider  from 'ra-data-simple-rest';
  import { ItemList } from "../admin components/items";
  import itemEdit from "../admin components/itemEdit";
  import adminAuth from '../admin components/adminAuth';
  import {createBrowserHistory } from 'history';
import LoginPage from '../admin components/LoginPage';
import {UserList} from '../admin components/users'
const adminhistory = createBrowserHistory ({ basename: '/admin' });




//   const httpClient = (url, options = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: 'application/json' });
//     }
//     const token = localStorage.getItem('token');
//     options.headers.set('Authorization', `Bearer ${token}`);
//     return fetchUtils.fetchJson(url, options);
// }
// const dataProvider = simpleRestProvider('http://localhost:8000/api' );

const AdminDash = () => {
  return (
    <div>
        <Admin basename="/admin" loginPage={LoginPage}  authProvider={adminAuth}  dataProvider= {simpleRestProvider('http://localhost:8000/api' )} >
    <Resource name="items" edit={itemEdit} list={ItemList} />
    <Resource name="users" list={UserList} />
  </Admin>;
        </div>
  )
}

export default AdminDash