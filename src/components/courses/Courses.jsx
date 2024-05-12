import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Modal, Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_SUBSCRIBE } from '../../utils/utils';
import { Link } from 'react-router-dom';

export function Courses({ url, subscribed }) {
    const [items, setItems] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        if (subscribed) {
            fetchSubscribedCourses();
        } else {
            fetchNonSubscribedCourses();
        }
        
    }, [])

    const fetchNonSubscribedCourses = () => {
        axios.get(url)
        .then(response => {
            console.log("All courses fetched successfully!", response.data);
            setItems(response.data.map(course => createNonSubscribedCoursesData(course.id, course.name, course.description)));
        })
        .catch(error => console.error(error));
    }

    const fetchSubscribedCourses = () => {
        axios.get(url)
        .then(response => {
            console.log("Subscribed courses fetched successfully!", response.data);
            setItems(response.data.map(course => createSubscribedCoursesData(course.id, course.name, course.description, course.url)));
        })
        .catch(error => console.error(error));
    }

    function createNonSubscribedCoursesData(id, name, description) {
        return { id, name, description };
    }

    function createSubscribedCoursesData(id, name, description, url) {
        return { id, name, description, url };
    }

    return (
        <Carousel>
        {
            items.map((item, i) => <Item key={i} item={item} subscribed={subscribed} />)
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
                width: '50%', 
                height: '40vh', 
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


            {isCourseModalOpen && !props.subscribed && (
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

            {isCourseModalOpen && props.subscribed && (
                <Modal
                    open={isCourseModalOpen}
                    onClose={handleCourseModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">{props.item.name}</Typography>
                        <Typography id="modal-modal-title" variant="h8" component="h2">{props.item.description}</Typography>
                        <Link to={props.item.url} target="_blank">
                            <Button variant="contained">Access course</Button>
                        </Link>
                        
                    </Box>
                </Modal>
            )}
        </div>
    )
}