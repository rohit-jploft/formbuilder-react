import { Helmet } from 'react-helmet-async';

import {FormBuilderView} from '../sections/addForm/FormBuilderView';

// ----------------------------------------------------------------------

export default function AddForm() {
  return (
    <>
      <Helmet>
        <title> Form Builder </title>
      </Helmet>

      <FormBuilderView />
    </>
  );
}
