# File Upload Backend with Node.js, Express, Mongoose, Cloudinary, and Local File Upload

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Cloudinary**: Cloud-based image and video management.
- **Local File Upload**: File storage on local server.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/krish868496/backend-fileupload.git


2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   PORT = 4000
DB_NAME = ""
CLOUDINARY_CLOUD_NAME = ""
CLOUDINARY_API_KEY = ""
CLOUDINARY_API_SECRET = ""

MAIL_HOST = smtp.gmail.com
MAIL_USER =xyz@gmail.com
MAIL_PASS =lkjhgfds
   ```

   Replace `your-database`, `your-cloudinary-cloud-name`, `your-cloudinary-api-key`, and `your-cloudinary-api-secret` with your actual MongoDB database URI and Cloudinary credentials.

## Usage

1. **Start the server:**

   ```bash
   npm run dev
   ```

2. **API Endpoints:**

   - **`POST /imageUpload`**: Upload a file to Cloudinary
   - **`POST /localFileUpload`**: Upload a file to local server.

   Add more details about specific endpoints or functionalities if needed.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

