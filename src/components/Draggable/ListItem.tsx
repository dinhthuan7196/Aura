import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import {
  Delete as DeleteIcon,
  Visibility,
  VisibilityOff,
  YouTube,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';

import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
} from '@mui/material';

import { Item } from './type';

const useStyles = makeStyles({
  draggingListItem: {
    background: 'rgb(235,235,235)',
  },
});

interface DraggableListItemProps {
  item: Item;
  index: number;
  onRemoveItem: (value: Item) => void;
  onHiddenItem: (value: Item) => void;
}

const DraggableListItem: FC<DraggableListItemProps> = ({
  item,
  index,
  onRemoveItem,
  onHiddenItem,
}: DraggableListItemProps) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ''}
          secondaryAction={
            <>
              <Tooltip title="Delete">
                <IconButton onClick={() => onRemoveItem(item)}>
                  <DeleteIcon sx={{ color: red[500] }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Hidden">
                <IconButton
                  onClick={() =>
                    onHiddenItem({
                      ...item,
                      isHidden: !item.isHidden,
                    })
                  }
                >
                  {item.isHidden ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
            </>
          }
        >
          <ListItemIcon>
            <YouTube />
          </ListItemIcon>
          <ListItemText primary={item.content} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
