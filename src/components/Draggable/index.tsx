import { FC, useState, memo } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { Button, Box } from '@mui/material';
import { reOrder } from '@utils/helpers';

import ListItem from './ListItem';
import { Item } from './type';

const Videos = styled.div`
  height: 200px;
  overflow: auto;
`;
interface DraggableProps {
  items: Item[];
  onSubmit?: (values: Item[]) => void;
}

const Draggable: FC<DraggableProps> = ({ items, onSubmit }: DraggableProps) => {
  const [dataInitial, setDataInitial] = useState<Item[]>(items);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reOrder(items, source.index, destination.index);
    setDataInitial(newItems);
    setIsDisabled(false);
  };

  const onRemoveItem = (item: Item) => {
    const newItems = dataInitial.filter((elm) => item.id !== elm.id);
    setDataInitial(newItems);
    setIsDisabled(false);
  };

  const onHiddenItem = (item: Item) => {
    const newItems = dataInitial.map((elm) => {
      if (item.id === elm.id) {
        return item;
      }
      return elm;
    });
    setDataInitial(newItems);
    setIsDisabled(false);
  };

  return (
    <>
      <Box mb={3}>
        <Button
          variant="outlined"
          color="primary"
          disabled={isDisabled}
          onClick={() => {
            if (onSubmit) {
              onSubmit(dataInitial);
            }
            setIsDisabled(true);
          }}
        >
          Save
        </Button>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Videos>
          <Droppable droppableId="droppable-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {dataInitial.map((item, index) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    index={index}
                    onRemoveItem={onRemoveItem}
                    onHiddenItem={onHiddenItem}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Videos>
      </DragDropContext>
    </>
  );
};

export default memo(Draggable);
