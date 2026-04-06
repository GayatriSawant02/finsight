import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionsProvider } from './context/TransactionsContext';
import { ThemeProvider } from './context/ThemeContext';
import { RoleProvider } from './context/RoleContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Insights from './pages/Insights/Insights';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <TransactionsProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="insights" element={<Insights />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
        </TransactionsProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}

export default App;
