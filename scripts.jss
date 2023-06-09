// Front-end code

document.getElementById('add-text-button').addEventListener('click', function () {
    var content = document.getElementById('content-input').value;
    if (content !== '') {
        var textElement = document.createElement('p');
        textElement.textContent = content;
        document.getElementById('blog-preview').appendChild(textElement);
        document.getElementById('content-input').value = '';
    }
});

document.getElementById('add-image-button').addEventListener('click', function () {
    var fileInput = document.getElementById('file-input');
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageElement = document.createElement('img');
            imageElement.src = e.target.result;
            document.getElementById('blog-preview').appendChild(imageElement);
        };
        reader.readAsDataURL(fileInput.files[0]);
        fileInput.value = '';
    }
});

document.getElementById('add-video-button').addEventListener('click', function () {
    var videoURL = document.getElementById('video-input').value;
    if (videoURL !== '') {
        var videoElement = document.createElement('iframe');
        videoElement.src = videoURL;
        videoElement.width = '560';
        videoElement.height = '315';
        document.getElementById('blog-preview').appendChild(videoElement);
        document.getElementById('video-input').value = '';
    }
});

document.getElementById('publish-button').addEventListener('click', function () {
    var blogContent = document.getElementById('blog-preview').innerHTML;
    // Send blogContent to the server for saving or further processing
});


// Back-end code using Node.js, Express.js, and MongoDB

const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
    content: String
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(express.json());

app.post('/blogs', (req, res) => {
    const blog = new Blog({
        content: req.body.content
    });

    blog.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error saving blog');
        } else {
            res.status(200).send('Blog saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
