import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <h1>Contact</h1>

      <div className="contact-grid">
        <div className="contact-card">
          <h2>Phone</h2>
          <p>(801)503-1246</p>
        </div>

        <div className="contact-card">
          <h2>Email</h2>
          <p>jonathan.savastano1246@gmail.com</p>
        </div>

        <div className="contact-card">
          <h2>GitHub</h2>
          <a href="https://github.com/JonathanSavastano" target="_blank" rel="noopener noreferrer">
            <img src="/githublogo.png" alt="GitHub" className="contact-logo" />
          </a>
        </div>

        <div className="contact-card">
          <h2>LinkedIn</h2>
          <a href="https://www.linkedin.com/in/jonathan-savastano-8a79b32a7" target="_blank" rel="noopener noreferrer">
            <img src="/linkedinlogo.png" alt="LinkedIn" className="contact-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
