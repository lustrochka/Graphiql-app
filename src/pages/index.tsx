import Link from 'next/link';

const WelcomePage: React.FC = () => {
  return (
    <main>
      <h1>Welcome</h1>
        <nav>
        <ul>
          <li><Link href="/signin">Sign In</Link></li>
          <li><Link href="/signup">Sign Up</Link></li>
        </ul>
        <ul>
          <li><Link href="/history">History</Link></li>
          <li><Link href="/restclient">REST Client</Link></li>
          <li><Link href="/graphiql">GraphiQL</Link></li>
        </ul>
      </nav>
    </main>
  );
};

export default WelcomePage;
