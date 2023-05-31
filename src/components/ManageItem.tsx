import { styled } from 'styled-components';

import iconEdit from '../assets/icon-edit.svg';
import iconDelete from '../assets/icon-trash.svg';

interface ManageItemProps {
  image: string;
  membername: string;
}

export const ManageItemBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
jusitfy-content: center;
width: 100%;
`;

const ItemImageSection = styled.div`
position: relative;
margin-bottom: 10px;
`;

const ItemConfig = styled.div`
position: absolute;
top:0;
right: 0;
z-index: 5;
`;

const Edit = styled.button`
background-image: url(${iconEdit});
background-repeat: no-repeat;
background-size: contain;
width: 25px;
height: 25px;
margin-right:5px;
`;

const Delete = styled.button`
background-image: url(${iconDelete});
background-repeat: no-repeat;
background-size: contain;
width: 25px;
height: 25px;
`;

const ItemImageBox = styled.div`
width: 300px;
height: 300px;
border-radius: 50%;
overflow: hidden;
`;

const ItemImage = styled.img`
width: 100%;
margin-right: 11px;
`;

const ItemTitleSection = styled.p`
text-align: center;
`;

const ManageItem = ({
  image,
  membername
}: ManageItemProps) => {
  return (
    <ManageItemBox>
      <ItemImageSection>
        <ItemConfig>
          <Edit></Edit>
          <Delete></Delete>
        </ItemConfig>
        <ItemImageBox>
          <ItemImage src={image} alt="image" />
        </ItemImageBox>
      </ItemImageSection>
      <ItemTitleSection>{membername}</ItemTitleSection>
    </ManageItemBox>
  );
};

export default ManageItem;
