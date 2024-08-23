import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';

const EditExercise = () => {
  const { id } = useParams();
  // const history = useHistory();
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const API_URL = 'https://mern-exercise-tracker-backend-fz71.onrender.com';

  useEffect(() => {
    axios.get(API_URL + '/exercises/' + id)
      .then(response => {
        const exercise = response.data.exercise;
        setUsername(exercise.username);
        setDescription(exercise.description);
        setDuration(exercise.duration);
        setDate(new Date(exercise.date));
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(API_URL + '/users/')
      .then(response => {
        const users = response.data.users;
        if (users.length > 0) {
          setUsers(users.map(user => user.username));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date
    };

    console.log(exercise);

    axios.put(API_URL + 'http://localhost:5000/exercises/update/' + id, exercise)
      .then(res => console.log(res.data));

    // history.push('/');
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}>
            {users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={date => setDate(date)}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
