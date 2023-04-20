import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import { formatPrice } from "../../utility/utility";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const CustomerOrder = ({ order }) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 6000, bgcolor: 'background.paper', margin: "10px 0px 10px 0px", border: "1px solid black", borderRadius: "10px", overflow: "hidden" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Order ID: <b>{order._id}</b>
                    <Button variant="contained" color="success" endIcon={<SendIcon />} sx={{ float: "right", marginTop: "10px" }}>Process</Button>
                </ListSubheader>
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                {order.shippingInfo.name + '; ' + order.shippingInfo.contact + '; ' + order.shippingInfo.address}
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <PaidIcon />
                </ListItemIcon>
                {order.bill ? formatPrice(order.bill) : formatPrice(99999999)}
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                Items
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {order.items.map((item) => (
                        <ListItemButton key={item._id} sx={{ pl: 4 }}>
                            {item.name} ({item.storageOption}, {item.colorOption}) <b>x{item.quantity}</b>
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </List>
    );
}

export default CustomerOrder;