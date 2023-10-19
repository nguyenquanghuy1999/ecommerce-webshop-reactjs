import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LayoutDefault from './layouts/LayoutDefault/LayoutDefault';
import { routes } from './Routes'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => { 

            let Layout = LayoutDefault;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = <Fragment />
            }

            const ProtectedRoute = route.protected;

            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={ProtectedRoute ?
                  (<Layout>
                    <ProtectedRoute>
                      <Page />
                    </ProtectedRoute>
                  </Layout>)
                  :
                  (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
