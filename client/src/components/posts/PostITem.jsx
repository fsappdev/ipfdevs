import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import userDefault from '../../img/default-user.png'
import { addLike, removeLike } from '../../actions/post' 


const PostITem = ({addLike, 
    removeLike, 
    auth, 
    post: {_id, user, text, name, avatar, likes, comments, date}
}) => {

    
  const fechaDate = new Date(date)
  const fechaDateConv = fechaDate.toLocaleDateString()

  return (
    <div className="post bg-white p-1 my-1">      
        <div>
            <a href="profile.html">
                <img
                className="round-img"               
                src={avatar ? avatar : userDefault}
                alt=""
                />
                <h4>{name}</h4>
            </a>
        </div>

        <div>
            <p className="my-1">
                {text}
            </p>
            
            <p className="post-date">
                Creado el {fechaDateConv}
            </p>
            
            <button  onClick={(e)=>addLike(_id)}
                type="button" className="btn btn-light">
                <i className="fas fa-thumbs-up"></i>{' '}
                <span>
                    {likes.length > 0 ? likes.length : null}
                </span>
            </button>
            
            <button onClick={(e)=>removeLike(_id)}
                type="button" className="btn btn-light">
                <i className="fas fa-thumbs-down"></i>
               {/*  <span>
                    {likes.length > 0 ? likes.length : null}
                </span> */}
            </button>
            
            <Link to={`/post/${_id}`} className="btn btn-primary">
                Comentarios 
                {
                    comments.length > 0 ?
                    <span className='comment-count'>{comments.length}</span>
                    :
                    null
                }
            </Link>

                {
                    !auth.loading && user === auth.user._id && 
                    <button      
                        type="button"
                        className="btn btn-danger"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                }
        </div>
    </div>

  )
}

PostITem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {addLike, removeLike})( PostITem)