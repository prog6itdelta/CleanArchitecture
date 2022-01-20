import React, {state, setState} from "react"
import { SelectColumnFilter } from "./Components/ColumnFilter"
import { useFilters } from "react-table"
export const columns =
    [
      {
        Header: "ID",
        accessor: "id",
        Filter:'',

      },
      {
        Header: "Имя",
        accessor: "firstname",
        width:235

      },
      {
        Header: "Фамилия",
        accessor: "lastname",
        width:235

      },
      {
        Header: "Email",
        accessor: "email",
        width:235

      },
      {
        Header: "Роль",
        accessor: "role",
        width:235,
        Filter:SelectColumnFilter
      },
      
    ]

 export const data = 
    [
      {
        id:'1',
        firstname:'Test',
        lastname:'tesT',
        email:'test@mail.ru',
        role:'admin'
      },
      {
        id:'2',
        firstname:'Test',
        lastname:'tesT',
        email:'test2@mail.ru',
        role:'user'
      },
      {
      id:'3',
      firstname:'Test',
      lastname:'tesT',
      email:'test3@mail.ru',
      role:'guest'
      },
      {
      id:'4',
      firstname:'Test',
      lastname:'tesT',
      email:'test@mail.ru',
      role:'admin'
      },
      {
      id:'5',
      firstname:'Test',
      lastname:'tesT',
      email:'test2@mail.ru',
      role:'user'
      },
      {
      id:'6',
      firstname:'Test',
      lastname:'tesT',
      email:'test3@mail.ru',
      role:'guest'
      },
      {
      id:'7',
      firstname:'Test',
      lastname:'tesT',
      email:'test@mail.ru',
      role:'admin'
      },
      {
      id:'8',
      firstname:'Test',
      lastname:'tesT',
      email:'test2@mail.ru',
      role:'user'
      },
      {
      id:'9',
      firstname:'Test',
      lastname:'tesT',
      email:'test3@mail.ru',
      role:'guest'
      },
      {
      id:'10',
      firstname:'Test',
      lastname:'tesT',
      email:'test@mail.ru',
      role:'admin'
      },
      {
      id:'11',
      firstname:'Test',
      lastname:'tesT',
      email:'test2@mail.ru',
      role:'user'
      },
      {
      id:'12',
      firstname:'Test',
      lastname:'tesT',
      email:'test3@mail.ru',
      role:'guest'
      },
      {
      id:'13',
      firstname:'Test',
      lastname:'tesT',
      email:'test3@mail.ru',
      role:'guest'
      },
      {
      id:'14',
      firstname:'Test',
      lastname:'tesT',
      email:'test3@mail.ru',
      role:'guest'
      },
        
    ]