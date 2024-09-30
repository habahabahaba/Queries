// React-Query:
import { useIsFetching } from '@tanstack/react-query';

export default function Header({ children }) {
  const fetching = useIsFetching();

  return (
    <header id='main-header'>
      <div id='header-title'>
        <h1>React Events</h1>
      </div>
      <div id='main-header-loading'>{fetching ? <progress /> : null}</div>
      <nav>{children}</nav>
    </header>
  );
}
