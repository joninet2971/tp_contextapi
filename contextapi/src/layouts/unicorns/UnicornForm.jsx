import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { UnicornContext } from '../../context/UnicornContext';
import { useNavigate, useParams } from 'react-router-dom';

const UnicornForm = () => {
  const { createUnicorn, editUnicorn, unicorns } = useContext(UnicornContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: '',
    age: '',
    color: '',
    power: ''
  });

  useEffect(() => {
    if (id) {
      const unicornToEdit = unicorns.find(u => u._id === id);
      if (unicornToEdit) {
        setInitialValues({
          name: unicornToEdit.name,
          age: unicornToEdit.age,
          color: unicornToEdit.color,
          power: unicornToEdit.power
        });
      }
    }
  }, [id, unicorns]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Requerido'),
      age: Yup.number().required('Requerido').positive('Debe ser mayor a 0'),
      color: Yup.string().required('Requerido'),
      power: Yup.string().required('Requerido')
    }),
    onSubmit: async (values) => {
      if (id) {
        await editUnicorn(id, values);
      } else {
        await createUnicorn(values);
      }
      navigate('/unicornios');
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Nombre"
      />
      {formik.errors.name && <p>{formik.errors.name}</p>}

      <input
        name="age"
        value={formik.values.age}
        onChange={formik.handleChange}
        placeholder="Edad"
        type="number"
      />
      {formik.errors.age && <p>{formik.errors.age}</p>}

      <input
        name="color"
        value={formik.values.color}
        onChange={formik.handleChange}
        placeholder="Color"
      />
      {formik.errors.color && <p>{formik.errors.color}</p>}

      <input
        name="power"
        value={formik.values.power}
        onChange={formik.handleChange}
        placeholder="Poder"
      />
      {formik.errors.power && <p>{formik.errors.power}</p>}

      <button type="submit">{id ? 'Actualizar' : 'Crear'} Unicornio</button>
    </form>
  );
};

export default UnicornForm;
