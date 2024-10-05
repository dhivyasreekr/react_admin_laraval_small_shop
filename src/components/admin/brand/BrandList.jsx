import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const BrandList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="image_path" />
            <EditButton basepath='/brands'/>
            <DeleteButton basepath='/brands' />
        </Datagrid>
    </List>
);