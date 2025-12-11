# Contributing to Doha Offers MVP

Thank you for your interest in contributing to the Doha Offers MVP! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites
- Node.js v14 or higher
- Git
- A code editor (VS Code recommended)

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/doha-offers-mvp.git
cd doha-offers-mvp
```

3. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

## Development Workflow

### Running the Application

Use the convenience script:
```bash
./start.sh
```

Or run manually:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Ensure code follows the existing style
4. Write clear, descriptive commit messages

### Commit Message Guidelines

Use clear and descriptive commit messages:
```
feat: Add user authentication
fix: Resolve pricing display issue
docs: Update API documentation
style: Format code according to standards
refactor: Restructure filter component
test: Add tests for offer card component
```

## Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Use meaningful variable and function names
- Keep components small and focused
- Comment complex logic
- Use ES6+ features

### CSS
- Use BEM naming convention when appropriate
- Keep styles modular and component-specific
- Use CSS variables for colors and common values
- Ensure responsive design

### File Organization
```
frontend/src/
├── components/
│   ├── ComponentName.jsx
│   └── ComponentName.css
├── App.jsx
└── main.jsx

backend/src/
├── routes/
├── controllers/
└── server.js
```

## Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

### Manual Testing Checklist
- [ ] Search functionality works
- [ ] All filters apply correctly
- [ ] Sorting works as expected
- [ ] Responsive on mobile devices
- [ ] No console errors
- [ ] API endpoints return correct data

## Submitting Changes

### Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update the README.md if adding features
4. Create a pull request with a clear description

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Commented complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

## Feature Requests

### Submitting Feature Requests

1. Check existing issues to avoid duplicates
2. Clearly describe the feature and its benefits
3. Provide examples or mockups if applicable
4. Explain the use case

### Feature Request Template
```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Explain when and how this would be used

## Benefits
What value does this add?

## Possible Implementation
Any ideas on how to implement this?
```

## Bug Reports

### Submitting Bug Reports

1. Check if the bug has already been reported
2. Provide detailed steps to reproduce
3. Include expected vs actual behavior
4. Add screenshots or error messages

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: 
- OS: 
- Node version: 

## Screenshots
Add screenshots if applicable
```

## Development Best Practices

### Backend Development
- Validate all inputs
- Use proper error handling
- Keep routes RESTful
- Document API endpoints
- Use async/await for asynchronous operations

### Frontend Development
- Keep state management simple
- Avoid prop drilling (use Context if needed)
- Optimize re-renders
- Handle loading and error states
- Make components reusable

### Performance
- Optimize images
- Minimize bundle size
- Use code splitting
- Implement lazy loading
- Cache API responses when appropriate

### Security
- Validate user inputs
- Sanitize data
- Use HTTPS in production
- Keep dependencies updated
- Follow OWASP guidelines

## Areas for Contribution

### High Priority
- Database integration (replace JSON with real DB)
- User authentication and profiles
- Booking system
- Payment integration
- Advanced search with autocomplete

### Medium Priority
- Favorites/wishlist feature
- Email notifications
- Social sharing
- Reviews and ratings
- Admin dashboard

### Low Priority
- Dark mode
- Multi-language support
- Push notifications
- Analytics dashboard
- Mobile app

## Questions or Need Help?

- Create an issue with the "question" label
- Reach out to maintainers
- Check existing documentation

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Doha Offers MVP! 🎉
