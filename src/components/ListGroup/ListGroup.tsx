import { useState } from "react";
import "./ListGroup.css";
import styled from "styled-components";

const List = styled.ul`
list-style: none;
padding: 0;
`;

interface ListItemProps{
  active: boolean;
}

const ListItems = styled.li<ListItemProps>`
background: ${props => props.active? 'blue': 'none'}
padding: 5px 0px;
`;

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  let [SelectedIndex, SetIndex] = useState(0);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>List not found</p>}
      <List>
        {items.map((item, index) => (
          <ListItems
            active = {SelectedIndex === index}
            key={item}
            onClick={() => {
              SetIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </ListItems>
        ))}
      </List>
    </>
  );
}

export default ListGroup;
