import axios from 'axios';
import { browserHistory } from 'react-router';
import { GET_STORY, GET_STORIES, STORY_TO_NULL } from './actionTypes';
import { message } from 'antd';
const apiEndpoint = 'http://localhost:8000/stories';

export async function createStory(formData, dispatch) {
  const storyType = formData.type;
  delete formData.type;

  let story = {
    type: storyType,
    [storyType]: { ...formData }
  }

  try {
    await axios.post(apiEndpoint, story, {
      headers: { authorization: localStorage.getItem('token') }
    });
    message.success('Your story has been created', 3);
    browserHistory.push('/dashboard')
  } catch (e) {
    message.error('There was a error saving the form, please try again.', 3);
  }
}

export function getStories() {
  return dispatch => {
    axios.get(apiEndpoint, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(data => {
      dispatch({
        type: GET_STORIES,
        all: data.data
      });
    })
    .catch(err => {

    });
  }
}

export function getStory(id) {
  return dispatch => {
    axios.get(`${apiEndpoint}/${id}`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(data => {
      dispatch({
        type: GET_STORY,
        story: data.data
      });
    })
    .catch(err => {
      console.log(err);
      message.error('Could not get story');
    });
  }
}

export function updateStory(id, story) {
  let newStory;
  if(story.from) {
    newStory = {
      ...story,
    };
    newStory.from = newStory.from.format()
    newStory.to = newStory.to.format()
  }

  return dispatch => {
    axios.put(`${apiEndpoint}/${id}`, newStory, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      console.log(res);
      message.success('Your story was updated');
    })
    .catch(err => {
      console.log(err);
      message.error('Something went wrong, please try again');
    })
  }
}

export function removeStory(id) {

  return dispatch => {
    axios.delete(`${apiEndpoint}/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      message.success('Story deleted.')
      browserHistory.push('/dashboard/stories');
    })
    .catch(err => {
      console.log(err);
      message.error('There was an error deleting your story.')
    })
  }
}

export function setCurrentStoryToNull() {
  return {
    type: STORY_TO_NULL
  }
}
