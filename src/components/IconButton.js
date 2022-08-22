import styled from 'styled-components';
import { Link } from 'react-router-dom';

const IconButton = ({ href, className, children, style, to }) => {
  return (
    <IconButtonStyles style={style} className={className} to={to}>
      {children}
    </IconButtonStyles>
  );
};

const IconButtonStyles = styled(Link)`
  background: transparent;
  height: 30px;
  width: 30px;
  border: 0;
  padding: 0;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
  }
`;

export default IconButton;
