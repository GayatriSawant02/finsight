# FinSight

FinSight is a modern personal finance dashboard built with React and Vite. It offers an intelligent transaction overview, reporting, insights, and user role controls to support both administrator and viewer workflows.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the app at the local address shown by Vite, typically:
   ```bash
   http://localhost:5173
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/components` - shared layout components, navigation, top bar
- `src/pages` - application screens: Dashboard, Transactions, Insights, Settings
- `src/context` - global state providers for theme, transactions, and user role
- `src/pages/Transactions` - transaction data, filters, table, and modals
- `src/pages/Dashboard` - summary cards, upcoming bills, and visualizations

## Approach

The app uses a theme-driven design system with a `ThemeContext` to manage light/dark mode at the application level. UI styling is applied through reusable class mappings so components render consistently across both themes.

A `RoleContext` manages user permissions and persists the selected role in local storage. This enables a clear distinction between:

- `Admin Panel` — full transaction management (add, edit, delete)
- `Viewer Panel` — read-only transaction access

The transaction view is built with both desktop and mobile experiences in mind, including responsive filters, a table layout, and a mobile-friendly transaction list.

## Features

### Dashboard

- Summary cards for income, spending, and category insights
- Light and dark theme support
- Upcoming bills card with a action button that shows a success message when processing payments
- Notification dropdown in the top bar

### Transactions

- Role-based permissions for admin and viewer modes
- Add transaction modal for admins
- Filterable transaction list by type, category, and search text
- Responsive desktop table and mobile transaction cards
- Conditional edit/delete controls based on selected role

### Insights

- Spending insights and anomaly cards
- Savings opportunities and smart suggestions
- Weekly progress highlights
- PDF export functionality

### Settings

- Regional settings for currency and timezone display
- Interface theme selection with light/dark mode controls
- Persistent theme preference stored in local storage

## Notes

- The app uses mock transaction data and local state for demonstration purposes.
- Role selection is saved in local storage so the current panel persists across refreshes.
- Theme mode is also persisted between sessions.
