import React from "react";

const Contact = () => {
    return (
        <div className="page-container">
            <div className="contact-header">
                Adam von Kraemer
            </div>
            <div className="contact-details-box">
                <div className="contact-details">
                    <b>
                        <p>Phone:</p>
                        <p>E-mail:</p>
                        <p>LinkedIn:</p>
                        <p>Website:</p>
                        <p>Location:</p>
                        <p>CV:</p>
                    </b>
                </div>
                <div className="contact-details">
                    <p>+46729426178</p>
                    <p>adam.vk@live.se</p>
                    <p><a href="http://linkedin.com/in/adam-vk" target="_blank">linkedin.com/in/adam-vk</a></p>
                    <p><a href="http://adamvonkraemer.com" target="_blank">adamvonkraemer.com</a></p>
                    <p>Helsingborg</p>
                    <p><a href="http://adamvonkraemer.com/static/media/adam-cv.d8165020.pdf" target="_blank">Download</a></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;