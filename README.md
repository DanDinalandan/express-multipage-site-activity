# Express Multipage Website

A modern, responsive multipage website built with Express.js featuring dynamic content, contact forms, and API integration.

## Features

- **Homepage**: Welcome page with feature highlights and call-to-action buttons
- **About Page**: Information about the project and technologies used
- **Contact Form**: Functional contact form with client-side validation and server-side processing
- **Blog Section**: Dynamic blog posts fetched from JSONPlaceholder API
- **Responsive Design**: Mobile-friendly design that works on all devices
- **Modern UI**: Clean, professional design with smooth animations

## Technologies Used

- **Backend**: Express.js, Node.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API Integration**: JSONPlaceholder API for blog posts
- **Styling**: Custom CSS with responsive design
- **Form Handling**: Client-side validation with server-side processing

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd express-multipage-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
express-multipage-site/
├── server.js              # Express server configuration
├── package.json           # Project dependencies and scripts
├── views/                 # HTML templates
│   ├── index.html        # Homepage
│   ├── about.html        # About page
│   ├── contact.html      # Contact page with form
│   └── blog.html         # Blog page with API integration
├── public/               # Static assets
│   └── style.css         # Main stylesheet
└── data/                 # Data files
    └── posts.json        # Fallback blog posts
```

## API Endpoints

- `GET /` - Homepage
- `GET /about` - About page
- `GET /contact` - Contact page
- `GET /blog` - Blog page
- `POST /api/contact` - Contact form submission
- `GET /api/posts` - Blog posts (fetched from JSONPlaceholder API)

## Contact Form

The contact form includes:
- Client-side validation for name, email, and message fields
- Email format validation
- Server-side processing with error handling
- Success/error feedback to users
- Responsive design

## Blog Integration

The blog section:
- Fetches posts from JSONPlaceholder API
- Displays posts with titles, content, and metadata
- Includes loading states and error handling
- Falls back to local posts if API is unavailable
- Responsive card-based layout

## Deployment

This project can be deployed to various hosting platforms:

### Heroku
1. Create a Heroku app
2. Set up Git repository
3. Deploy using Git push

### Vercel
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically

### Netlify
1. Connect your repository
2. Set build command: `npm start`
3. Deploy

## Development

To run in development mode:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
