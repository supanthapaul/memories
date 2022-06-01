import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'
import Post from './Post/Post'
import useStyles from './styles'

const Posts = ({setCurrentPostId}) => {
	const posts = useSelector(state => state.posts);
	const classes = useStyles();

	console.log(posts)
	return (
		!posts.length ? <CircularProgress /> : (
			<Grid className={classes.mainContainer} container alignItems='stretch' spacing={4}>
				{posts.map((post) => (
					<Grid key={post._id} item xs={12} sm={6}>
						<Post post={post} setCurrentPostId={setCurrentPostId}/>
					</Grid>
				))}
			</Grid>
		)
	)
}

export default Posts