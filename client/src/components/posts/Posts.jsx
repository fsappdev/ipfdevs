import PropTypes from 'prop-types'
import {useEffect} from 'react'
import { connect }from 'react-redux'
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from './PostITem'

const Posts = ({getPosts, post: {posts, loading}}) => {

    useEffect(() => {
      
        getPosts()
      
    }, [getPosts])
    

  return (
    <>
        {
            loading ? <Spinner/> 
                : 
            <>
                <h1 className='text-primary'>Posts</h1>
                <p className='lead'>
                    <i className='fas fa user'>
                        Bienvenido a la comunidad
                    </i>
                </p>
                {/* post Form */}
               <div className="posts">
                   {
                       posts && posts.map(item=>{
                           return <PostItem key={item._id} post={item} />
                       })
                   }
               </div>
            </>
        }
    </>
  )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post : state.post,
})

export default connect(mapStateToProps, { getPosts })(Posts) 