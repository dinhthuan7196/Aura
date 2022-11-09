import { toast } from 'react-toastify';

import { objProps } from '@utils/types';

export type ToasterProps = {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
};

const Toaster = (props: ToasterProps) => {
  const { message, type } = props;
  const options: objProps = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case 'info':
      toast.info(message, options);
      break;
    case 'warning':
      toast.warn(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    default:
      toast.success(message, options);
      break;
  }
};

export default Toaster;
