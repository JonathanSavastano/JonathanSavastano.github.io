import { useState } from 'react';
import Calculator from '../components/Calculator';
import './WebDevProjects.css';

function WebDevProjects() {
  return (
    <div className="web-projects">
      <h1>Web Development Projects</h1>

      <div className="project-grid">
        {/* Words per minute app */}
        <div className="project-card">
          <h3>Words Per Minute Counter</h3>
          <p>
            This application will count your words per minute. When you click generate,
            your time begins, when you click stop, it will give you a count.
          </p>
          <a href="/wpm.html" className="project-btn">Launch WPM</a>
        </div>

        {/* Weather App */}
        <div className="project-card">
          <h3>Weather Application</h3>
          <p>
            This weather application was made using the free weather map API. It may not be 100% accurate
            because it is a free API, but it works well enough.
          </p>
          <a href="/weather.html" className="project-btn">Launch Weather App</a>
        </div>

        {/* React E Commerce video */}
        <div className="project-card video-card">
          <h3>E Commerce Website</h3>
          <video controls className="project-video">
            <source src="/ECommerce.mp4" type="video/mp4" />
            Your browser does not support this video tag.
          </video>
        </div>

        {/* Todo list app */}
        <div className="project-card video-card">
          <h3>To Do List App</h3>
          <p>
            Here is an example of using Create, Remove, Update, Delete (CRUD)
            in a simple drag and drop to do list application. Now with local storage!
          </p>
          <video controls className="project-video">
            <source src="/Todo.mp4" type="video/mp4" />
            Your browser does not support this video tag.
          </video>
        </div>

        {/* TOWN restaurant */}
        <div className="project-card video-card">
          <h3>TOWN Restaurant</h3>
          <p>
            This is a fake website made for an imagined chinese restaurant that I made for
            my web development course.
          </p>
          <video controls className="project-video">
            <source src="/Town.mp4" type="video/mp4" />
            Your browser does not support this video tag.
          </video>
        </div>
      </div>

      {/* Calculator */}
      <div className="calculator-section">
        <h2>Calculator</h2>
        <Calculator />
      </div>
    </div>
  );
}

export default WebDevProjects;
