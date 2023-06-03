import AddImageIcon from '../assets/icon-add-image.svg';

import IconButton, { PropsTypes } from './IconButton';

const AddImageButton: React.FC<Omit<PropsTypes, 'image'>> = ({
  size,
  ...props
}) => {
  return <IconButton size={size} image={AddImageIcon} {...props} />;
};

export default AddImageButton;
