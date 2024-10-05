import { useState } from 'react'

import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { CategoryList } from './components/admin/category/CategoryList';
import { BrandList } from './components/admin/brand/BrandList';

// Custom data provider for react-admin
const customDataProvider = (baseUrl) => ({
  getList: async (resource, params) => {
      const { data, total } = await fetch(`${baseUrl}/${resource}`)
          .then(response => response.json());

      return {
          data,
          total,
      };
  },
  getOne: async (resource, params) => {
      const { id } = params;
      const record = await fetch(`${baseUrl}/${resource}/${id}`)
          .then(response => response.json());

      return {
          data: record,
      };
  },
  create: async (resource, params) => {
      const { data } = await fetch(`${baseUrl}/${resource}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(params.data),
      }).then(response => response.json());

      return {
          data,
      };
  },
  update: async (resource, params) => {
      const { id, data } = params;
      const updatedRecord = await fetch(`${baseUrl}/${resource}/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      }).then(response => response.json());

      return {
          data: updatedRecord,
      };
  },
  delete: async (resource, params) => {
      const { id } = params;
      await fetch(`${baseUrl}/${resource}/${id}`, {
          method: 'DELETE',
      });

      return {
          data: { id }, // Returning the deleted record's ID
      };
  },
  // Other methods (getMany, getManyReference, etc.) can be implemented similarly
});

// Use the custom data provider in your App component
function App() {
  return (
      <>
          <Admin dataProvider={customDataProvider(import.meta.env.VITE_API_BASE_URL)}>
              <Resource name="categories" list={CategoryList} />
              <Resource name="brands" list={BrandList} />
          </Admin>
      </>
  );
}

export default App;