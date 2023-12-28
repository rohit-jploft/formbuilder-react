import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { HTML5Backend } from 'react-dnd-html5-backend';

import App from './app';
import { GlobalProvider } from './context/GlobalState';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <GlobalProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </GlobalProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
