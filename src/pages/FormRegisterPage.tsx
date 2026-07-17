import { useEffect } from 'react';
import FormRegister from '../components/FormRegister';

const FormRegisterPage = () => {
  useEffect(() => {
    document.title = "Pendaftaran Lomba | OSC 2026";
  }, []);

  return <FormRegister />;
};

export default FormRegisterPage;
