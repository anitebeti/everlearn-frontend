import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Modal, Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_SUBSCRIBE } from '../../utils/utils';

export function Courses({ url }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(url)
        .then(response => {
            console.log("All courses fetched successfully!", response.data);
            setItems(response.data.map(course => createData(course.id, course.name, course.description)));
        })
        .catch(error => console.error(error));
    }, [])

    function createData(id, name, description) {
        return { id, name, description };
    }

    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    );
}

export function Item(props) {

    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const modalStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const handleCourseModalOpen = () => {
        setIsCourseModalOpen(true);
    }

    const handleCourseModalClose = () => {
        setIsCourseModalOpen(false);
    }

    const handleSubscribe = () => {
        console.log("SUBSCRIBE: ", user.id, props.item.id);
        axios.post(USER_SUBSCRIBE, { userId: user.id, courseId: props.item.id })
        .then(response => console.log(response))
        .catch(error => console.error(error));

        handleCourseModalClose();
    }

    return (

        <div>
            <Paper
                sx={{ 
                width: '100%', 
                height: '80vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                margin: 'auto'}}>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>

                <Button className="CheckButton" onClick={handleCourseModalOpen}>
                    Check it out!
                </Button>
            </Paper>


            {isCourseModalOpen && (
                <Modal
                    open={isCourseModalOpen}
                    onClose={handleCourseModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">{props.item.name}</Typography>
                        <Typography id="modal-modal-title" variant="h8" component="h2">{props.item.description}</Typography>
                        <Button variant="contained" onClick={handleSubscribe}>Subscribe</Button>
                    </Box>
                </Modal>
            )}
        </div>
    )
}