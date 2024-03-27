import { type FC } from "react";
import {
  List,
  ListItem,
  ListItemDecorator,
  ListItemButton,
  Button,
  IconButton,
} from "@mui/joy";
import { Phone, PhoneCallback, PhoneForwarded } from "@mui/icons-material";
import { useHistory } from "../../hooks/useHistory";
import { useNavigate } from "react-router";

export const HistoryList: FC = () => {
  const navigate = useNavigate();
  const [history] = useHistory();

  return (
    <List>
      {history.map(({ direction, phone }, i) => (
        <ListItem
          key={i}
          endAction={
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onClick={() => {
                navigate(`/call?phone=${phone}`);
              }}
            >
              <Phone />
            </IconButton>
          }
        >
          <ListItemDecorator>
            {direction === "outgoing" && <PhoneForwarded />}
            {direction === "incoming" && <PhoneCallback />}
          </ListItemDecorator>
          {phone}
        </ListItem>
      ))}
    </List>
  );
};
