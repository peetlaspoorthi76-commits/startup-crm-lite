import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
      <p className="text-muted mb-8">The page you are looking for doesn't exist in the CRM.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
      >
        Go back to Dashboard
      </Link>
    </div>
  );
}
