import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Exercise({ exercise, deleteExercise }) {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={"/edit/" + exercise._id}>
          <i className="fa-solid fa-pen-to-square" />
        </Link> | <a href='#' onClick={() => { deleteExercise(exercise._id) }}>
          <i className="fa-solid fa-trash" />
        </a>
      </td>
    </tr>
  )
}

function ExercisesList() {
  const [exercises, setExercises] = useState([]);
  const API_URL = 'https://mern-exercise-tracker-backend-fz71.onrender.com';

  useEffect(() => {
    axios.get(API_URL + '/exercises/')
      .then(response => {
        const exercises = response.data.exercises;
        setExercises(exercises);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function deleteExercise(id) {
    axios.delete(API_URL + '/exercises/' + id)
      .then(response => { console.log(response.data) });

    setExercises(exercises.filter(el => el._id !== id));
  };

  function exerciseList() {
    return exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />;
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList()}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
