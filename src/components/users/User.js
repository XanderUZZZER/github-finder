import React, { useEffect, useContext, Fragment } from 'react';
import Spinner from '../layouts/Spinner';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext'

const User = ({ repos, getUserRepos, match }) => {
  const githubContext = useContext(GithubContext);

  const { user, loading, getUser } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company
  } = user;

  if (loading) return <Spinner />

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>Back to search</Link>
        Hireable: {' '}
      {hireable ?
        <i className='fas fa-check text-success' /> :
        <i className='fas fa-times-circle text-danger' />
      }
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className='round-img'
            alt=""
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>{bio && (
          <Fragment>
            <h3>Bio</h3>
            <p>{bio}</p>
          </Fragment>
        )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github profile
            </a>
          <ul>
            <li>
              {login && <Fragment>
                <strong>Username:</strong> {login}
              </Fragment>}
            </li>
            <li>
              {company && <Fragment>
                <strong>Company:</strong> {company}
              </Fragment>}
            </li>
            <li>
              {blog && <Fragment>
                <strong>WebSite:</strong> {blog}
              </Fragment>}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public repos: {public_repos}</div>
        <div className="badge badge-dark">Public gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  )
}

User.propType = {
  repos: PropTypes.array.isRequired,
  getUserRepos: PropTypes.func.isRequired
};

export default User
