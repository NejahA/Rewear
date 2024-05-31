import { List, Datagrid, TextField, ImageField,EmailField, DateField, EditButton, DeleteButton } from "react-admin";
const CrudRoute = () => (
    <div>
      &lt;CrudRoute&gt; elements are for configuration only and should not be
      rendered
    </div>
  );
export const ItemList = (props) => (
    <List resource="items"  {...props}>
        <Datagrid rowClick="edit">
            {/* <TextField source="_id" /> */}
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="category" />
            <TextField source="brand" />
            <TextField source="size" /> 
            <TextField source="description" /> 
            <TextField source="price" /> 
            <TextField source="user" /> 
            <TextField source="status" /> 
            <DateField source="createdAt"/> 
            <DateField source="updatedAt"/> 
            <ImageField source="itemPics" src='url'/> 
            <EditButton />

            <DeleteButton basePath='/items' />
            {/* <TextField source="itemPics" />  */}
            

            {/* <TextField source="website" />
            <TextField source="company.name" /> */}
        </Datagrid>
    </List>
);
