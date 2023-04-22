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
import { forwardRef, useState } from "react";
import { formatPrice, isAdmin } from "../../utility/utility";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from 'axios';
import { apiKey } from '../../api/ApiKey';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomerOrder = ({ order, reloadOrders }) => {
    const [open, setOpen] = useState(true);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const orderStatus = () => {
        return order.status;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const processOrder = () => {
        // Thing still possibly goes wrong, so need to check again.
        if (isAdmin(sessionStorage['user'])) {
            let body = {
                orderId: order._id
            };

            axios.put(apiKey + 'acceptOrder', body, {
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    console.log(response);
                    reloadOrders();
                    setOpenSnackBar(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const displayUnitInfo = (name, storage = '', color = '') => {
        if (storage === '' && color === '') {
            return ` ${name}` ;
        } else if (storage === '' && color !== '') {
            return ` ${name} (${color})` ;
        } else if (storage !== '' && color === '') {
            return ` ${name} (${storage})` ;
        } else {
            return ` ${name} (${storage}, ${color}) `;
        }
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 6000, bgcolor: 'background.paper', margin: "10px 0px 10px 0px", border: "1px solid black", borderRadius: "10px", overflow: "hidden" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Order ID: <b>{order._id}</b>
                    {
                        isAdmin(sessionStorage['user']) ? // For admin
                            (orderStatus() === "open"
                                ? <Button variant="contained" color="success" endIcon={<SendIcon />} sx={{ float: "right", marginTop: "10px" }} onClick={() => processOrder()}>Process</Button>
                                : <Button variant="contained" color="info" endIcon={<CheckIcon />} sx={{ float: "right", marginTop: "10px" }}>Finished</Button>
                            ) : // For normal user
                            (orderStatus() === "open"
                                ? <Button variant="contained" color="secondary" endIcon={<ShoppingBagIcon />} sx={{ float: "right", marginTop: "10px" }}>Awaiting</Button>
                                : <Button variant="contained" color="success" endIcon={<CheckIcon />} sx={{ float: "right", marginTop: "10px" }}>Finished</Button>
                            )
                    }

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
                    {order.items.map((item, index) => (
                        <ListItemButton key={item._id} sx={{ pl: 4 }}>
                            <b>{index + 1}.</b>{displayUnitInfo(item.name, item.storageOption, item.colorOption)} <b>x{item.quantity}</b>
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Order {order._id} has been processed successfully.
                </Alert>
            </Snackbar>
        </List>
    );
}

export default CustomerOrder;