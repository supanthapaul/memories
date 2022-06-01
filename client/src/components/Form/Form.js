import React, {useState, useEffect} from 'react'
import { TextField, Paper, Button, Typography} from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'

import useStyles from './styles'
import {createPost, updatePost} from '../../actions/posts'

const INITIAL_POST = {
	creator: "",
	title: "",
	message: "",
	tags: "",
	selectedFile: ""
};

const Form = ({currentPostId, setCurrentPostId}) => {
	const currentPost = useSelector(state => currentPostId ? state.posts.find((p) => p._id == currentPostId) : null);

	const dispatch = useDispatch();
	const classes = useStyles();
	const [postData, setPostData] =useState(INITIAL_POST)

	useEffect(() => {
		if(currentPost) {
			setPostData(currentPost)
		}
	}, [currentPost])

	const handleSubmit = (e) => {
		e.preventDefault();

		if(currentPostId) {
			dispatch(updatePost(currentPostId ,postData));
		}
		else {
			dispatch(createPost(postData));
		}

		clearForm();
	}
	const clearForm = (e) => {
		setCurrentPostId(null);
		setPostData(INITIAL_POST);
	}
	return (
		<Paper className={classes.paper}>
			<form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
				<Typography variant='h6'>{currentPostId ? 'Editing' : 'Create'} a Memory</Typography>
				<TextField 
					name='creator'
					variant='outlined'
					label="Creator"
					fullWidth
					value={postData.creator}
					onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
				/>
				<TextField 
					name='title'
					variant='outlined'
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField 
					name='message'
					variant='outlined'
					label="Message"
					fullWidth
					value={postData.message}
					onChange={(e) => setPostData({ ...postData, message: e.target.value })}
				/>
				<TextField 
					name='tags'
					variant='outlined'
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
				/>

				<div className={classes.fileInput}>
					<FileBase 
						type="file"
						multiple={false}
						onDone={(file) => setPostData({ ...postData, selectedFile: file.base64 })}
					/>
				</div>
				<Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
				<Button variant="contained" color="secondary" size="small" onClick={clearForm} fullWidth>Clear</Button>
			</form>
		</Paper>
	)
}

export default Form