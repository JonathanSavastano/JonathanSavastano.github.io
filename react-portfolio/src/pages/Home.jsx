import { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome</h1>
          <p className="hero-description">
            This site serves as a portfolio for all of my game development and web development projects.
            It is a work in progress and I will continue to update both the quality of this website,
            the way it is hosted, and I will add my new projects to the page. Go check out the projects page
            and enjoy some of my currently featured projects!
          </p>
        </div>
      </section>

      <section className="profile-section">
        <h2>Profile</h2>
        <p>
          Versatile programmer with a strong foundation in software
          development and a passion for game design and Web Development. Eager to
          contribute technical prowess to diverse projects, with a focus
          on creating immersive gaming and web experiences that blend
          creativity with technical excellence.
        </p>
      </section>

      <section className="clock-section">
        <h3>Digital Clock</h3>
        <div className="digital-clock">{formatTime(time)}</div>
      </section>
    </div>
  );
}

export default Home;
